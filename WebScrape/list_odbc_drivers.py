#!/usr/bin/env python3
"""
Script utilitário para listar drivers ODBC disponíveis no sistema.
Útil para verificar qual driver SQL Server está instalado.
"""

from src.database.sqlserver import find_sql_server_drivers, list_available_drivers


def main():
    print("=" * 60)
    print("DRIVERS ODBC DISPONÍVEIS")
    print("=" * 60)
    
    all_drivers = list_available_drivers()
    sql_drivers = find_sql_server_drivers()
    
    print(f"\nDrivers SQL Server encontrados ({len(sql_drivers)}):")
    if sql_drivers:
        for driver in sql_drivers:
            print(f"  ✓ {driver}")
    else:
        print("  ✗ Nenhum driver SQL Server encontrado")
        print("\n  Para instalar, baixe de:")
        print("  https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server")
    
    print(f"\n\nTodos os drivers ODBC disponíveis ({len(all_drivers)}):")
    for driver in all_drivers:
        marker = "  [SQL Server]" if driver in sql_drivers else "  "
        print(f"{marker}{driver}")
    
    print("\n" + "=" * 60)
    if sql_drivers:
        print("RECOMENDAÇÃO:")
        print(f"  Use: SQLSERVER_DRIVER={sql_drivers[0]}")
        print("=" * 60)
    else:
        print("AÇÃO NECESSÁRIA:")
        print("  Instale um driver SQL Server ODBC antes de continuar.")
        print("=" * 60)


if __name__ == "__main__":
    main()

