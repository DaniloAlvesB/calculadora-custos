export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

export interface MonthlyData {
  month: string; // Format: YYYY-MM
  expenses: Expense[];
  incomes: Income[];
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
}

export type ExpenseCategory = 
  | 'alimentacao'
  | 'transporte'
  | 'moradia'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'roupas'
  | 'outros';

export type IncomeCategory = 
  | 'salario'
  | 'freelance'
  | 'bonus'
  | 'investimentos'
  | 'vendas'
  | 'presente'
  | 'outros';

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'moradia', label: 'Moradia' },
  { value: 'saude', label: 'Saúde' },
  { value: 'educacao', label: 'Educação' },
  { value: 'lazer', label: 'Lazer' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'outros', label: 'Outros' },
];

export const INCOME_CATEGORIES: { value: IncomeCategory; label: string }[] = [
  { value: 'salario', label: 'Salário' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'bonus', label: 'Bônus' },
  { value: 'investimentos', label: 'Investimentos' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'presente', label: 'Presente' },
  { value: 'outros', label: 'Outros' },
];