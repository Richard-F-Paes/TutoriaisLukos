# Dados Mockados

Esta pasta contém dados mockados (simulados) **apenas para desenvolvimento**.

## Importante

- **NUNCA** use estes dados em produção
- Estes dados são apenas para desenvolvimento local quando não há banco de dados configurado
- Use a variável de ambiente `VITE_USE_MOCK_DATA=true` para habilitar mocks

## Uso

Os dados mockados devem ser carregados apenas quando:
- `import.meta.env.DEV === true` (modo desenvolvimento)
- `import.meta.env.VITE_USE_MOCK_DATA === 'true'`

## Estrutura

- `lukosTutorials.js` - Tutoriais mockados do sistema Lukos
- `retaguardaTutorials.js` - Tutoriais mockados da retaguarda
- `tutorialData.js` - Dados gerais de tutoriais
- `videoTutorialsData.js` - Dados de tutoriais em vídeo


