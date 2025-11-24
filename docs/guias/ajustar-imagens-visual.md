# 🎨 Guia: Como Ajustar Imagens e Elementos Visuais

## 📍 Onde Ajustar Imagens

### 1. **Imagem Principal do Tutorial** (Banner/Capa)

**Onde definir:**
- No arquivo de dados do tutorial: `src/shared/data/__mocks__/retaguardaTutorials.js` ou `lukosTutorials.js`

**Como ajustar:**
```javascript
'unidades-operacionais': {
  id: 'unidades-operacionais',
  title: 'Unidades Operacionais',
  // ← AQUI você define a imagem principal
  image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
  // ou
  image: 'https://via.placeholder.com/800x450?text=Unidades+Operacionais',
  // ou
  image: '/imagens/unidades-operacionais.jpg', // Imagem local na pasta public
  // ...
}
```

**Onde é exibida:**
- Linha 217 do `CousesDetail.jsx`: `<ImageWithFallback src={course.image} ... />`
- Aparece no banner superior (seção escura) ao lado do título

**Estilos aplicados:**
- Classe: `rounded-lg shadow-2xl`
- Localização: Seção `bg-gray-900` (fundo escuro)

---

### 2. **Imagens dos Passos/Steps**

**Onde definir:**
- No array `steps` de cada tutorial

**Como ajustar:**
```javascript
steps: [
  {
    step: 1,
    title: 'Acessar Unidades Operacionais',
    // ← AQUI você define a imagem do passo
    image: 'https://via.placeholder.com/300x200?text=Passo+1',
    // ou
    image: '/imagens/passo1-unidades.jpg',
    // ou
    image: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg',
    // ...
  }
]
```

**Onde é exibida:**
- Atualmente não está sendo exibida no `CourseDetail`, mas está disponível nos dados
- Pode ser adicionada ao player de vídeo se necessário

---

### 3. **Thumbnails de Vídeos do YouTube**

**Como obter automaticamente:**
Se você usar um vídeo do YouTube, a thumbnail é gerada automaticamente:

```javascript
videoUrl: 'https://www.youtube.com/embed/sjWk3XpdH3s'
// Thumbnail automática: https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg
```

**Formatos disponíveis:**
- `maxresdefault.jpg` - Máxima resolução (1280x720)
- `hqdefault.jpg` - Alta qualidade (480x360)
- `mqdefault.jpg` - Média qualidade (320x180)
- `sddefault.jpg` - Qualidade padrão (640x480)

**Exemplo:**
```javascript
image: 'https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg'
```

---

## 🎨 Onde Ajustar Estilos e Cores

### 1. **Banner Superior (Seção Escura)**

**Arquivo:** `src/presentation/components/content/Courses/CousesDetail.jsx`

**Linha 181:** Seção principal
```jsx
<section className="bg-gray-900 text-white">
  {/* bg-gray-900 = cor de fundo escura */}
  {/* text-white = cor do texto branca */}
```

**Para mudar a cor:**
```jsx
<section className="bg-blue-900 text-white">  {/* Azul escuro */}
<section className="bg-purple-900 text-white"> {/* Roxo escuro */}
<section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white"> {/* Gradiente */}
```

---

### 2. **Imagem do Banner**

**Linha 217:** Componente de imagem
```jsx
<ImageWithFallback 
  src={course.image} 
  alt={course.title} 
  className="rounded-lg shadow-2xl"  // ← AQUI você ajusta o estilo
/>
```

**Estilos disponíveis:**
```jsx
// Bordas arredondadas
className="rounded-lg"        // Bordas médias
className="rounded-xl"        // Bordas maiores
className="rounded-2xl"       // Bordas muito grandes
className="rounded-full"      // Círculo completo

// Sombras
className="shadow-lg"         // Sombra grande
className="shadow-2xl"        // Sombra muito grande
className="shadow-none"       // Sem sombra

// Tamanho
className="w-full h-auto"     // Largura total, altura automática
className="w-96 h-64"         // Tamanho fixo
className="max-w-md"          // Largura máxima

// Efeitos
className="hover:scale-105 transition-transform" // Zoom no hover
className="opacity-90"       // Transparência
```

**Exemplo completo:**
```jsx
<ImageWithFallback 
  src={course.image} 
  alt={course.title} 
  className="rounded-xl shadow-2xl w-full h-auto hover:scale-105 transition-transform"
/>
```

---

### 3. **Badge de Nível**

**Linha 185:** Badge do nível do curso
```jsx
<Badge className="mb-4">{course.level}</Badge>
```

**Para customizar:**
```jsx
<Badge className="mb-4 bg-blue-600 text-white">{course.level}</Badge>
<Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">{course.level}</Badge>
```

---

### 4. **Botões**

**Linha 203-213:** Botões de ação
```jsx
<Button size="lg" onClick={() => setShowPlayer(true)}>
  <Play className="w-5 h-5 mr-2" />
  Começar Tutorial
</Button>
```

**Para customizar cores:**
- Edite o componente `Button` em: `src/presentation/components/ui/Button/Button.js`
- Ou adicione classes inline:
```jsx
<Button 
  size="lg" 
  className="bg-blue-600 hover:bg-blue-700"
  onClick={() => setShowPlayer(true)}
>
```

---

### 5. **Cards de Lições**

**Linha 52-77:** Componente `LessonItem`

**Cores ativas:**
```jsx
// Linha 64: Cor quando está ativo
active ? 'bg-blue-50 border border-blue-200' 

// Para mudar:
active ? 'bg-purple-50 border border-purple-200'  // Roxo
active ? 'bg-green-50 border border-green-200'    // Verde
```

**Cores de ícones:**
```jsx
// Linha 68: Cor do ícone
completed ? 'text-green-600' : 'text-gray-400'

// Para mudar:
completed ? 'text-blue-600' : 'text-gray-400'     // Azul quando completo
```

---

## 📁 Onde Colocar Imagens Locais

### Opção 1: Pasta `public`

1. Crie a pasta: `public/imagens/`
2. Coloque suas imagens lá: `public/imagens/unidades-operacionais.jpg`
3. Use no tutorial:
```javascript
image: '/imagens/unidades-operacionais.jpg'
```

### Opção 2: Pasta `src/assets`

1. Crie a pasta: `src/assets/imagens/`
2. Coloque suas imagens lá
3. Importe no arquivo:
```javascript
import imagemUnidades from '../../assets/imagens/unidades-operacionais.jpg'
// Use: image: imagemUnidades
```

**Recomendação:** Use a pasta `public` para imagens que mudam frequentemente.

---

## 🖼️ Tamanhos Recomendados de Imagens

### Imagem Principal (Banner)
- **Recomendado:** 1280x720px (16:9)
- **Mínimo:** 800x450px
- **Formato:** JPG ou PNG
- **Peso:** Máximo 500KB

### Imagens dos Passos
- **Recomendado:** 800x600px (4:3)
- **Mínimo:** 400x300px
- **Formato:** JPG ou PNG
- **Peso:** Máximo 200KB

---

## 🎯 Exemplo Prático: Personalizar um Tutorial

```javascript
// No arquivo retaguardaTutorials.js
'unidades-operacionais': {
  id: 'unidades-operacionais',
  title: 'Unidades Operacionais',
  category: 'Cadastros',
  difficulty: 'Intermediário',
  duration: '11min',
  description: 'Gestão de unidades operacionais...',
  
  // ← IMAGEM PRINCIPAL (banner)
  image: 'https://img.youtube.com/vi/sjWk3XpdH3s/maxresdefault.jpg',
  // ou imagem local:
  // image: '/imagens/unidades-operacionais-banner.jpg',
  
  videoUrl: 'https://www.youtube.com/embed/sjWk3XpdH3s',
  
  steps: [
    {
      step: 1,
      title: 'Acessar Unidades Operacionais',
      description: 'Navegue até o módulo...',
      duration: 120,
      
      // ← IMAGEM DO PASSO
      image: 'https://via.placeholder.com/800x600?text=Passo+1',
      // ou imagem local:
      // image: '/imagens/passo1-unidades.jpg',
      
      tips: 'Tenha em mãos os dados da unidade',
      focusArea: 'Navegação no sistema'
    }
    // ... mais passos
  ]
}
```

---

## 🔧 Ajustes Rápidos no Componente

### Mudar cor do banner
**Arquivo:** `src/presentation/components/content/Courses/CousesDetail.jsx`  
**Linha 181:**
```jsx
// De:
<section className="bg-gray-900 text-white">

// Para (exemplo com gradiente azul-roxo):
<section className="bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700 text-white">
```

### Mudar estilo da imagem
**Linha 217:**
```jsx
// De:
<ImageWithFallback src={course.image} alt={course.title} className="rounded-lg shadow-2xl" />

// Para (exemplo com bordas maiores e hover):
<ImageWithFallback 
  src={course.image} 
  alt={course.title} 
  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300" 
/>
```

### Mudar cores dos cards de lições
**Linha 64:**
```jsx
// De:
active ? 'bg-blue-50 border border-blue-200'

// Para (exemplo roxo):
active ? 'bg-purple-50 border border-purple-200'
```

---

## 📝 Resumo dos Locais

| Elemento | Onde Definir | Onde Ajustar Estilo |
|----------|--------------|---------------------|
| **Imagem Principal** | Dados do tutorial (`image`) | Linha 217 - `className` |
| **Imagem dos Passos** | Dados do tutorial (`steps[].image`) | Não exibida atualmente |
| **Banner (fundo)** | - | Linha 181 - `className` |
| **Badge de Nível** | Dados do tutorial (`level`) | Linha 185 - `className` |
| **Botões** | - | Linha 203-213 - `className` |
| **Cards de Lições** | - | Linha 52-77 - `LessonItem` |

---

## 💡 Dicas

1. **Use imagens do YouTube:** Se o tutorial tem vídeo do YouTube, use a thumbnail automática
2. **Otimize imagens:** Comprima antes de adicionar (use TinyPNG ou similar)
3. **Nomes descritivos:** Use nomes claros para imagens locais
4. **Teste responsividade:** Verifique como as imagens aparecem em mobile
5. **Fallback:** O componente já tem fallback automático se a imagem não carregar

