#!/usr/bin/env node
/**
 * Script para gerar hash de senha usando bcryptjs
 * 
 * Uso: node scripts/generate-password-hash.js <senha>
 * 
 * Exemplo: node scripts/generate-password-hash.js admin123
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Erro: Forneça uma senha como argumento');
  console.log('Uso: node scripts/generate-password-hash.js <senha>');
  process.exit(1);
}

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('\n✅ Hash gerado com sucesso:');
    console.log(hash);
    console.log('\n📝 Adicione ao .env:');
    console.log(`VITE_AUTH_USERS=usuario:${hash}:Nome:role\n`);
  })
  .catch(error => {
    console.error('❌ Erro ao gerar hash:', error);
    process.exit(1);
  });

