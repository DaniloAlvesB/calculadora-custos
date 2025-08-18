# Calculadora de Orçamento Pessoal

Aplicação web para controle financeiro pessoal com registro de receitas e despesas mensais.

## 🚀 Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **ShadCN UI** - Componentes de interface
- **LocalStorage** - Armazenamento local

## 📋 Funcionalidades

### 💰 Gestão de Receitas
- Formulário para adicionar receitas
- 7 categorias: Salário, Freelance, Bônus, Investimentos, Vendas, Presente, Outros
- Lista com opção de exclusão

### 💸 Gestão de Despesas  
- Formulário para adicionar despesas
- 8 categorias: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Roupas, Outros
- Lista com opção de exclusão

### 📊 Resumo Financeiro
- **Receitas totais** (verde)
- **Despesas totais** (vermelho) 
- **Saldo mensal** (azul/laranja)
- Gráficos de categoria com percentuais
- Indicadores visuais de superávit/déficit

### 📅 Controle Mensal
- Navegação entre meses
- Dados organizados por mês/ano
- Histórico completo no localStorage

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta
cd calculadora-custos

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

## 📱 Como Usar

1. **Selecione o mês** desejado no painel superior
2. **Adicione receitas** usando o formulário verde
3. **Adicione despesas** usando o formulário padrão
4. **Visualize o resumo** com totais e saldo
5. **Navegue entre meses** para acompanhar o histórico

## 💾 Armazenamento

- Todos os dados ficam salvos no navegador (localStorage)
- Não há servidor ou banco de dados externo
- Dados persistem entre sessões
- Migração automática de versões antigas

## 🎨 Interface

- **Verde**: Receitas e formulários de entrada
- **Vermelho**: Despesas e gastos
- **Azul**: Saldo positivo (superávit)
- **Laranja**: Saldo negativo (déficit)
- Design responsivo para mobile e desktop

## 📊 Estrutura de Dados

```json
{
  "2024-08": {
    "month": "2024-08",
    "incomes": [
      {
        "id": "123",
        "description": "Salário",
        "amount": 5000,
        "category": "salario",
        "date": "2024-08-01"
      }
    ],
    "expenses": [
      {
        "id": "456", 
        "description": "Supermercado",
        "amount": 300,
        "category": "alimentacao",
        "date": "2024-08-01"
      }
    ],
    "totalIncomes": 5000,
    "totalExpenses": 300,
    "balance": 4700
  }
}
```

## 🔧 Desenvolvimento

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── page.tsx              # Página principal
├── components/
│   ├── ExpenseForm.tsx       # Formulário de despesas
│   ├── ExpenseList.tsx       # Lista de despesas
│   ├── IncomeForm.tsx        # Formulário de receitas
│   ├── IncomeList.tsx        # Lista de receitas
│   ├── MonthlySummary.tsx    # Resumo mensal
│   ├── MonthSelector.tsx     # Seletor de mês
│   └── ui/                   # Componentes ShadCN
├── lib/
│   └── storage.ts            # Utilitários localStorage
└── types/
    └── expense.ts            # Tipagens TypeScript
```

## 🎯 Objetivo

Projeto acadêmico para disciplina de Design Pessoal, focado em:
- Controle financeiro pessoal
- Interface intuitiva e responsiva
- Gestão completa de orçamento
- Visualização clara de dados financeiros
