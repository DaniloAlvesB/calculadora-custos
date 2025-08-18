'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense, EXPENSE_CATEGORIES } from '@/types/expense';
import { storageUtils } from '@/lib/storage';

interface ExpenseListProps {
  expenses: Expense[];
  currentMonth: string;
  onExpenseDeleted: () => void;
}

export function ExpenseList({ expenses, currentMonth, onExpenseDeleted }: ExpenseListProps) {
  const handleDelete = (expenseId: string) => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      storageUtils.removeExpense(currentMonth, expenseId);
      onExpenseDeleted();
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = EXPENSE_CATEGORIES.find(cat => cat.value === categoryValue);
    return category?.label || categoryValue;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Despesas do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nenhuma despesa registrada para este mês.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas do Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryLabel(expense.category)} • {formatDate(expense.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(expense.id)}
                className="ml-4"
              >
                Excluir
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}