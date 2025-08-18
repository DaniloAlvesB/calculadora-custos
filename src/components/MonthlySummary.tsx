'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense, Income, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/types/expense';

interface MonthlySummaryProps {
  expenses: Expense[];
  incomes: Income[];
  monthDisplay: string;
}

export function MonthlySummary({ expenses, incomes, monthDisplay }: MonthlySummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  const expenseCategoryTotals = EXPENSE_CATEGORIES.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category.value);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
    
    return {
      ...category,
      total,
      percentage,
      count: categoryExpenses.length,
    };
  }).filter(category => category.total > 0);

  const incomeCategoryTotals = INCOME_CATEGORIES.map(category => {
    const categoryIncomes = incomes.filter(income => income.category === category.value);
    const total = categoryIncomes.reduce((sum, income) => sum + income.amount, 0);
    const percentage = totalIncomes > 0 ? (total / totalIncomes) * 100 : 0;
    
    return {
      ...category,
      total,
      percentage,
      count: categoryIncomes.length,
    };
  }).filter(category => category.total > 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo - {monthDisplay}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumo Financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 mb-1">Receitas</p>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(totalIncomes)}
              </p>
              <p className="text-xs text-muted-foreground">
                {incomes.length} entrada{incomes.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 mb-1">Despesas</p>
              <p className="text-2xl font-bold text-red-700">
                {formatCurrency(totalExpenses)}
              </p>
              <p className="text-xs text-muted-foreground">
                {expenses.length} despesa{expenses.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className={`text-center p-4 rounded-lg border ${
              balance >= 0 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-orange-50 border-orange-200'
            }`}>
              <p className={`text-sm mb-1 ${
                balance >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                Saldo
              </p>
              <p className={`text-2xl font-bold ${
                balance >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                {formatCurrency(balance)}
              </p>
              <p className="text-xs text-muted-foreground">
                {balance >= 0 ? 'Superávit' : 'Déficit'}
              </p>
            </div>
          </div>

          {/* Receitas por Categoria */}
          {incomeCategoryTotals.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-green-700">Receitas por Categoria</h3>
              <div className="space-y-3">
                {incomeCategoryTotals
                  .sort((a, b) => b.total - a.total)
                  .map((category) => (
                    <div key={category.value} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.label}</span>
                        <span className="text-sm">
                          {formatCurrency(category.total)} ({category.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {category.count} receita{category.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Gastos por Categoria */}
          {expenseCategoryTotals.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-red-700">Gastos por Categoria</h3>
              <div className="space-y-3">
                {expenseCategoryTotals
                  .sort((a, b) => b.total - a.total)
                  .map((category) => (
                    <div key={category.value} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{category.label}</span>
                        <span className="text-sm">
                          {formatCurrency(category.total)} ({category.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {category.count} despesa{category.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {totalExpenses === 0 && totalIncomes === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma movimentação registrada para este mês.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}