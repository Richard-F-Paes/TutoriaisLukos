# Script para resetar banco de dados, executar seed e rodar scraper
# 
# Este script automatiza o processo completo:
# 1. Limpa o banco de dados
# 2. Executa migrations (opcional)
# 3. Executa seed
# 4. Executa scraper
#
# Uso: .\scripts\reset-db-seed-scraper.ps1

param(
    [switch]$SkipMigrations,
    [switch]$SkipSeed,
    [switch]$SkipScraper,
    [int]$ScraperLimit = 0,
    [switch]$ForceExtract
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando processo completo de reset do banco de dados..." -ForegroundColor Cyan
Write-Host ""

# Obter o diretório raiz do projeto
$rootDir = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $rootDir "backend"
$webScrapeDir = Join-Path $rootDir "WebScrape"

# Verificar se os diretórios existem
if (-not (Test-Path $backendDir)) {
    Write-Host "❌ Diretório backend não encontrado: $backendDir" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $webScrapeDir)) {
    Write-Host "❌ Diretório WebScrape não encontrado: $webScrapeDir" -ForegroundColor Red
    exit 1
}

# 1. Limpar banco de dados
Write-Host "📦 Passo 1/4: Limpando banco de dados..." -ForegroundColor Yellow
Write-Host ""
Set-Location $backendDir
try {
    npm run clear:database
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao limpar banco de dados"
    }
    Write-Host ""
    Write-Host "✅ Banco de dados limpo com sucesso!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Erro ao limpar banco de dados: $_" -ForegroundColor Red
    exit 1
}

# 2. Executar migrations (se não for pulado)
if (-not $SkipMigrations) {
    Write-Host "📦 Passo 2/4: Sincronizando schema do banco de dados..." -ForegroundColor Yellow
    Write-Host ""
    
    # Usar db push por padrão após limpar o banco (mais adequado para desenvolvimento)
    # db push não requer shadow database e funciona melhor com banco vazio
    Write-Host "   Usando: db push (recomendado após limpar banco)" -ForegroundColor Gray
    Write-Host ""
    
    try {
        npm run prisma:push
        if ($LASTEXITCODE -ne 0) {
            Write-Host ""
            Write-Host "⚠️  db push falhou, tentando migrate dev como fallback..." -ForegroundColor Yellow
            Write-Host ""
            npm run prisma:migrate
            if ($LASTEXITCODE -ne 0) {
                throw "Falha ao executar migrations (tentativas: db push e migrate dev)"
            }
            Write-Host ""
            Write-Host "✅ Migrations executadas com sucesso (via migrate dev)!" -ForegroundColor Green
        } else {
            Write-Host ""
            Write-Host "✅ Schema sincronizado com sucesso (via db push)!" -ForegroundColor Green
        }
        Write-Host ""
    } catch {
        Write-Host "❌ Erro ao executar migrations: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Dica: Verifique se o banco de dados está acessível e se o schema está correto." -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "⏭️  Passo 2/4: Pulando migrations..." -ForegroundColor Gray
    Write-Host ""
}

# 3. Executar seed (se não for pulado)
if (-not $SkipSeed) {
    Write-Host "📦 Passo 3/4: Executando seed..." -ForegroundColor Yellow
    Write-Host ""
    try {
        npm run seed
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao executar seed"
        }
        Write-Host ""
        Write-Host "✅ Seed executado com sucesso!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "❌ Erro ao executar seed: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⏭️  Passo 3/4: Pulando seed..." -ForegroundColor Gray
    Write-Host ""
}

# 4. Executar scraper (se não for pulado)
if (-not $SkipScraper) {
    Write-Host "📦 Passo 4/4: Executando scraper..." -ForegroundColor Yellow
    Write-Host ""
    Set-Location $webScrapeDir
    
    # Construir comando do scraper
    $scraperArgs = @()
    if ($ForceExtract) {
        $scraperArgs += "--force-extract"
    }
    if ($ScraperLimit -gt 0) {
        $scraperArgs += "--limit"
        $scraperArgs += $ScraperLimit
    }
    
    try {
        if ($scraperArgs.Count -gt 0) {
            python run_scraper.py $scraperArgs
        } else {
            python run_scraper.py
        }
        
        if ($LASTEXITCODE -ne 0) {
            throw "Falha ao executar scraper"
        }
        Write-Host ""
        Write-Host "✅ Scraper executado com sucesso!" -ForegroundColor Green
        Write-Host ""
    } catch {
        Write-Host "❌ Erro ao executar scraper: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⏭️  Passo 4/4: Pulando scraper..." -ForegroundColor Gray
    Write-Host ""
}

# Voltar para o diretório raiz
Set-Location $rootDir

Write-Host "✨ Processo completo finalizado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Resumo:" -ForegroundColor Cyan
Write-Host "   ✅ Banco de dados limpo"
if (-not $SkipMigrations) {
    Write-Host "   ✅ Migrations executadas"
}
if (-not $SkipSeed) {
    Write-Host "   ✅ Seed executado"
}
if (-not $SkipScraper) {
    Write-Host "   ✅ Scraper executado"
}
Write-Host ""

