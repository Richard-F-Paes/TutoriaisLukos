# IconCards Component

Componente reutilizável para exibir cards com ícones, títulos e descrições.

## Uso Básico

```jsx
import IconCards from '@/presentation/components/custom/IconCards/IconCards';
import { Code, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Cursos Práticos',
    description: 'Aprenda com projetos reais',
  },
  {
    icon: Users,
    title: 'Instrutores Experientes',
    description: 'Professores atuantes no mercado',
  },
  {
    icon: Award,
    title: 'Certificação',
    description: 'Receba certificados reconhecidos',
  },
];

<IconCards
  badge="Por que escolher"
  title="Tudo que você precisa"
  description="Oferecemos a melhor experiência"
  features={features}
  columns={4}
  bgColor="bg-white"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `features` | `Array` | `[]` | Array de objetos com `{ icon, title, description }` |
| `badge` | `string` | `undefined` | Texto do badge opcional |
| `title` | `string` | `undefined` | Título da seção |
| `description` | `string` | `undefined` | Descrição da seção |
| `bgColor` | `string` | `'bg-white'` | Classe CSS para cor de fundo |
| `columns` | `number` | `4` | Número de colunas no grid (1-4) |

## Estrutura do objeto `feature`

```typescript
{
  icon: React.ComponentType, // Componente de ícone do lucide-react
  title: string,             // Título do card
  description: string         // Descrição do card
}
```

## Exemplos

### Cards em 4 colunas (padrão)
```jsx
<IconCards features={features} columns={4} />
```

### Cards em 3 colunas
```jsx
<IconCards features={features} columns={3} />
```

### Cards em 2 colunas
```jsx
<IconCards features={features} columns={2} />
```

### Com fundo personalizado
```jsx
<IconCards features={features} bgColor="bg-gray-50" />
```

### Sem header (apenas cards)
```jsx
<IconCards features={features} />
```

## Dependências

- `react`
- `lucide-react` (para os ícones)
- `@/presentation/components/ui/card` (componente Card)

