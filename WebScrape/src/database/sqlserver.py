from __future__ import annotations

from dataclasses import dataclass

import pyodbc


@dataclass(frozen=True)
class SqlServerConfig:
    driver: str
    server: str
    database: str
    trusted_connection: bool
    username: str | None = None
    password: str | None = None
    port: int | None = None


def list_available_drivers() -> list[str]:
    """Lista todos os drivers ODBC disponíveis no sistema."""
    return [driver for driver in pyodbc.drivers()]


def find_sql_server_drivers() -> list[str]:
    """Encontra drivers ODBC específicos para SQL Server."""
    all_drivers = list_available_drivers()
    sql_drivers = [
        driver
        for driver in all_drivers
        if "SQL Server" in driver or "sql server" in driver.lower()
    ]
    return sql_drivers


def validate_driver(driver: str) -> None:
    """Valida se o driver especificado está disponível no sistema."""
    available = list_available_drivers()
    if driver not in available:
        sql_drivers = find_sql_server_drivers()
        error_msg = (
            f"Driver ODBC '{driver}' não encontrado.\n\n"
            f"Drivers SQL Server disponíveis:\n"
        )
        if sql_drivers:
            for drv in sql_drivers:
                error_msg += f"  - {drv}\n"
        else:
            error_msg += "  (nenhum driver SQL Server encontrado)\n"
        error_msg += (
            f"\nTodos os drivers ODBC disponíveis:\n"
        )
        for drv in available:
            error_msg += f"  - {drv}\n"
        error_msg += (
            f"\nPara instalar um driver SQL Server, baixe de:\n"
            f"https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server"
        )
        raise ValueError(error_msg)


def build_connection_string(cfg: SqlServerConfig) -> str:
    parts: list[str] = [
        f"DRIVER={{{cfg.driver}}}",
    ]
    
    # Construir SERVER com porta se especificada
    # Formato ODBC: SERVER=hostname,port (vírgula é mais compatível com ODBC Driver 17)
    # Alternativa: SERVER=hostname:port (dois pontos também funciona em alguns drivers)
    if cfg.port:
        # ODBC Driver 17 prefere vírgula para porta
        server_str = f"{cfg.server},{cfg.port}"
    else:
        server_str = cfg.server
    parts.append(f"SERVER={server_str}")
    
    parts.extend([
        f"DATABASE={cfg.database}",
        "TrustServerCertificate=yes",
    ])

    if cfg.trusted_connection:
        parts.append("Trusted_Connection=yes")
    else:
        if not cfg.username or not cfg.password:
            raise ValueError("SQL Server username/password required when trusted connection is disabled.")
        parts.append(f"UID={cfg.username}")
        parts.append(f"PWD={cfg.password}")

    conn_str = ";".join(parts) + ";"
    return conn_str


def connect(cfg: SqlServerConfig) -> pyodbc.Connection:
    """Conecta ao SQL Server usando pyodbc.
    
    Valida o driver antes de tentar conectar e fornece mensagens de erro úteis
    para diferentes tipos de erro (driver, autenticação, etc.).
    """
    validate_driver(cfg.driver)
    conn_str = build_connection_string(cfg)
    
    try:
        result = pyodbc.connect(conn_str)
        return result
    except (pyodbc.InterfaceError, pyodbc.OperationalError) as e:
        error_str = str(e)
        error_code = str(e.args[0]) if e.args else ""
        
        # Tratar erro 87 - Connection string inválida (OperationalError)
        if isinstance(e, pyodbc.OperationalError) and ("87" in error_code or "Connection string is not valid" in error_str):
            server_info = f"{cfg.server},{cfg.port}" if cfg.port else cfg.server
            raise pyodbc.OperationalError(
                f"Connection string inválida (erro 87):\n{error_str}\n\n"
                f"O formato da connection string pode estar incorreto.\n"
                f"Configuração usada:\n"
                f"- SERVER: {server_info}\n"
                f"- DATABASE: {cfg.database}\n"
                f"- Autenticação: {'Windows (Trusted)' if cfg.trusted_connection else 'SQL Server'}\n"
                f"- Driver: {cfg.driver}\n\n"
                f"Tente verificar se o formato SERVER=hostname,port está correto."
            ) from e
        
        # Erro de driver não encontrado (IM002)
        if "IM002" in error_str or ("driver" in error_str.lower() and "IM002" in error_code):
            sql_drivers = find_sql_server_drivers()
            raise pyodbc.InterfaceError(
                f"Erro ao conectar: {error_str}\n\n"
                f"Verifique se o driver '{cfg.driver}' está instalado corretamente.\n"
                f"Drivers SQL Server disponíveis: {', '.join(sql_drivers) if sql_drivers else 'nenhum'}"
            ) from e
        
        # Erro de autenticação (28000)
        if "28000" in error_str or "28000" in error_code:
            auth_type = "Windows (Trusted Connection)" if cfg.trusted_connection else "SQL Server (usuário/senha)"
            suggestions = [
                f"Tipo de autenticação atual: {auth_type}",
                "",
            ]
            
            if cfg.trusted_connection:
                suggestions.extend([
                    "O usuário do Windows atual não tem permissão para acessar o banco de dados.",
                    "",
                    "Soluções possíveis:",
                    "1. Configure permissões no SQL Server para o usuário Windows atual",
                    "2. Use autenticação SQL Server com usuário/senha:",
                    "   - Defina SQLSERVER_TRUSTED_CONNECTION=false no .env",
                    "   - Defina SQLSERVER_USERNAME e SQLSERVER_PASSWORD no .env",
                ])
            else:
                suggestions.extend([
                    "Verifique se o usuário e senha estão corretos.",
                    "Verifique se o usuário tem permissão para acessar o banco de dados.",
                ])
            
            server_info = f"{cfg.server}:{cfg.port}" if cfg.port else cfg.server
            suggestions.extend([
                "",
                "Outras verificações:",
                f"- O banco de dados '{cfg.database}' existe?",
                f"- O servidor '{server_info}' está acessível?",
                f"- O SQL Server está configurado para aceitar conexões remotas?",
            ])
            
            raise pyodbc.InterfaceError(
                f"Erro de autenticação SQL Server:\n{error_str}\n\n" + "\n".join(suggestions)
            ) from e
        
        # Erro de banco não encontrado (4060) - geralmente vem junto com 28000
        if "4060" in error_str or "4060" in error_code:
            server_info = f"{cfg.server}:{cfg.port}" if cfg.port else cfg.server
            raise pyodbc.InterfaceError(
                f"Banco de dados não encontrado:\n{error_str}\n\n"
                f"Verifique se o banco de dados '{cfg.database}' existe no servidor '{server_info}'.\n"
                f"Se necessário, crie o banco de dados antes de executar o script."
            ) from e
        
        # Outros erros de InterfaceError
        server_info = f"{cfg.server}:{cfg.port}" if cfg.port else cfg.server
        raise pyodbc.InterfaceError(
            f"Erro ao conectar ao SQL Server:\n{error_str}\n\n"
            f"Configuração usada:\n"
            f"- Servidor: {server_info}\n"
            f"- Banco: {cfg.database}\n"
            f"- Autenticação: {'Windows (Trusted)' if cfg.trusted_connection else 'SQL Server'}\n"
            f"- Driver: {cfg.driver}"
        ) from e
    except pyodbc.DatabaseError as e:
        # Erros de banco de dados (não de conexão)
        error_str = str(e)
        raise pyodbc.DatabaseError(
            f"Erro de banco de dados:\n{error_str}\n\n"
            f"Verifique se o banco de dados '{cfg.database}' existe e está acessível."
        ) from e


