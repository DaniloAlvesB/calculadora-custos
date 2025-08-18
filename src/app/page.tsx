'use client';

import { useState, useEffect } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { IncomeForm } from '@/components/IncomeForm';
import { IncomeList } from '@/components/IncomeList';
import { MonthlySummary } from '@/components/MonthlySummary';
import { MonthSelector } from '@/components/MonthSelector';
import { storageUtils } from '@/lib/storage';
import { Expense, Income } from '@/types/expense';

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentMonthKey = storageUtils.getMonthKey(new Date());
    setCurrentMonth(currentMonthKey);
    loadMonthData(currentMonthKey);
    setIsLoading(false);
  }, []);

  const loadMonthData = (monthKey: string) => {
    const monthData = storageUtils.getMonthData(monthKey);
    if (monthData) {
      const expensesWithDates = (monthData.expenses || []).map(expense => ({
        ...expense,
        date: new Date(expense.date),
      }));
      const incomesWithDates = (monthData.incomes || []).map(income => ({
        ...income,
        date: new Date(income.date),
      }));
      setExpenses(expensesWithDates);
      setIncomes(incomesWithDates);
    } else {
      setExpenses([]);
      setIncomes([]);
    }
  };

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
    loadMonthData(newMonth);
  };

  const handleExpenseAdded = () => {
    loadMonthData(currentMonth);
  };

  const handleExpenseDeleted = () => {
    loadMonthData(currentMonth);
  };

  const handleIncomeAdded = () => {
    loadMonthData(currentMonth);
  };

  const handleIncomeDeleted = () => {
    loadMonthData(currentMonth);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Calculadora de Orçamento Pessoal
          </h1>
          <p className="text-muted-foreground text-center">
            Registre suas receitas e despesas para acompanhar seu orçamento mensalmente
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <MonthSelector
              currentMonth={currentMonth}
              onMonthChange={handleMonthChange}
            />
            <IncomeForm
              currentMonth={currentMonth}
              onIncomeAdded={handleIncomeAdded}
            />
            <ExpenseForm
              currentMonth={currentMonth}
              onExpenseAdded={handleExpenseAdded}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <MonthlySummary
              expenses={expenses}
              incomes={incomes}
              monthDisplay={storageUtils.formatMonthDisplay(currentMonth)}
            />
            <IncomeList
              incomes={incomes}
              currentMonth={currentMonth}
              onIncomeDeleted={handleIncomeDeleted}
            />
            <ExpenseList
              expenses={expenses}
              currentMonth={currentMonth}
              onExpenseDeleted={handleExpenseDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
