# TechnologyCards Component

Componente reutilizável para exibir cards de tecnologias com ícones e cores personalizadas.

## Uso Básico

```jsx
import TechnologyCards from '@/presentation/components/custom/TechnologyCards/TechnologyCards';
import { Code, Terminal, Database } from 'lucide-react';

const technologies = [
  { name: 'React', icon: Code, color: 'bg-blue-100 text-blue-600' },
  { name: 'Python', icon: Terminal, color: 'bg-green-100 text-green-600' },
  { name: 'Node.js', icon: Database, color: 'bg-emerald-100 text-emerald-600' },
];

<TechnologyCards
  badge="Tecnologias"
  title="Domine as tecnologias mais requisitadas"
  description="Aprenda as ferramentas e linguagens que as empresas mais procuram"
  technologies={technologies}
  columnsMobile={2}
  columnsTablet={4}
  columnsDesktop={6}
  bgColor="bg-gray-50"
/>
```

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `technologies` | `Array` | `[]` | Array de objetos com `{ icon, name, color }` |
| `badge` | `string` | `undefined` | Texto do badge opcional |
| `title` | `string` | `undefined` | Título da seção |
| `description` | `string` | `undefined` | Descrição da seção |
| `bgColor` | `string` | `'bg-gray-50'` | Classe CSS para cor de fundo |
| `columnsMobile` | `number` | `2` | Número de colunas no mobile (1-4) |
| `columnsTablet` | `number` | `4` | Número de colunas no tablet (2-6) |
| `columnsDesktop` | `number` | `6` | Número de colunas no desktop (3-8) |

## Estrutura do objeto `technology`

```typescript
{
  icon: React.ComponentType,  // Componente de ícone do lucide-react
  name: string,              // Nome da tecnologia
  color: string              // Classes CSS para cor (ex: 'bg-blue-100 text-blue-600')
}
```

## Exemplos

### Grid padrão (2-4-6 colunas)
```jsx
<TechnologyCards technologies={technologies} />
```

### Grid personalizado (3 colunas no desktop)
```jsx
<TechnologyCards 
  technologies={technologies}
  columnsMobile={2}
  columnsTablet={3}
  columnsDesktop={3}
/>
```

### Com fundo personalizado
```jsx
<TechnologyCards 
  technologies={technologies}
  bgColor="bg-white"
/>
```

### Sem header (apenas cards)
```jsx
<TechnologyCards technologies={technologies} />
```

## Diferenças do IconCards

- **TechnologyCards**: Cards menores, apenas ícone + nome, cores personalizadas por tecnologia
- **IconCards**: Cards maiores, ícone + título + descrição, cores padronizadas

## Dependências

- `react`
- `lucide-react` (para os ícones)
- `@/presentation/components/ui/card` (componente Card)
- `@/presentation/components/ui/badge` (componente Badge)

