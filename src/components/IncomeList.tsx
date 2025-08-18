'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Income, INCOME_CATEGORIES } from '@/types/expense';
import { storageUtils } from '@/lib/storage';

interface IncomeListProps {
  incomes: Income[];
  currentMonth: string;
  onIncomeDeleted: () => void;
}

export function IncomeList({ incomes, currentMonth, onIncomeDeleted }: IncomeListProps) {
  const handleDelete = (incomeId: string) => {
    if (confirm('Tem certeza que deseja excluir esta receita?')) {
      storageUtils.removeIncome(currentMonth, incomeId);
      onIncomeDeleted();
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = INCOME_CATEGORIES.find(cat => cat.value === categoryValue);
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

  if (incomes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700">Receitas do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nenhuma receita registrada para este mês.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Receitas do Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{income.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {getCategoryLabel(income.category)} • {formatDate(income.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-700">
                      + {formatCurrency(income.amount)}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(income.id)}
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