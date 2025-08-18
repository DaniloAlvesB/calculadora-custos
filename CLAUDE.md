# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal budget calculator application ("Calculadora de Orçamento Pessoal") built with Next.js, TypeScript, ShadCN UI, and TailwindCSS. The application allows users to register both income (receitas) and expenses (despesas) and view comprehensive monthly summaries with income vs expenses analysis, with all data stored in localStorage.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Data Storage**: localStorage (client-side)

## Common Commands

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint

# Component Management
npx shadcn@latest add [component-name]  # Add new ShadCN components
```

## Architecture Overview

### Core Components
- `IncomeForm`: Form for adding new income entries with validation (green theme)
- `IncomeList`: Display and manage existing income entries with delete functionality
- `ExpenseForm`: Form for adding new expenses with validation
- `ExpenseList`: Display and manage existing expenses with delete functionality
- `MonthlySummary`: Comprehensive financial summary showing income, expenses, balance, and category breakdowns
- `MonthSelector`: Navigation controls for switching between months

### Data Management
- **Types**: Located in `src/types/expense.ts` - defines Expense, Income, MonthlyData interfaces
- **Storage**: `src/lib/storage.ts` - localStorage utilities for CRUD operations on both income and expenses
- **Structure**: Data organized by month keys (YYYY-MM format)

### Key Features
- **Income Tracking**: 7 predefined categories (Salário, Freelance, Bônus, Investimentos, Vendas, Presente, Outros)
- **Expense Tracking**: 8 predefined categories (Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Roupas, Outros)
- **Financial Balance**: Real-time calculation of income vs expenses with balance display
- **Visual Indicators**: Color-coded interface (green for income, red for expenses, blue/orange for balance)
- Month-based tracking with navigation controls
- Category-based breakdowns with percentage calculations
- Responsive design with mobile-first approach
- Brazilian Real (BRL) currency formatting

## Data Structure

Financial data is stored in localStorage with the following structure:
```typescript
{
  "2024-08": {
    month: "2024-08",
    expenses: [
      {
        id: string,
        description: string,
        amount: number,
        category: ExpenseCategory,
        date: Date
      }
    ],
    incomes: [
      {
        id: string,
        description: string,
        amount: number,
        category: IncomeCategory,
        date: Date
      }
    ],
    totalExpenses: number,
    totalIncomes: number,
    balance: number
  }
}
```

## Development Notes

- All monetary values are formatted in Brazilian Real (BRL)
- Date handling uses native JavaScript Date objects
- localStorage automatically handles month separation for both income and expenses
- Category labels are in Portuguese to match the target audience
- Balance calculation: `totalIncomes - totalExpenses`
- Visual feedback: Positive balance shows in blue, negative in orange
- The application is fully client-side with no backend dependencies
- Income and expense forms are visually distinct (green vs default themes)