'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Income, INCOME_CATEGORIES, IncomeCategory } from '@/types/expense';
import { storageUtils } from '@/lib/storage';

interface IncomeFormProps {
  currentMonth: string;
  onIncomeAdded: () => void;
}

export function IncomeForm({ currentMonth, onIncomeAdded }: IncomeFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<IncomeCategory | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || !category) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    const income: Income = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: numAmount,
      category: category as IncomeCategory,
      date: new Date(date),
    };

    const monthKey = storageUtils.getMonthKey(new Date(date));
    storageUtils.saveIncome(monthKey, income);
    
    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    
    onIncomeAdded();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Adicionar Receita</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="income-description">Descrição *</Label>
            <Input
              id="income-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Salário do mês"
              required
            />
          </div>

          <div>
            <Label htmlFor="income-amount">Valor (R$) *</Label>
            <Input
              id="income-amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <Label htmlFor="income-category">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {INCOME_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="income-date">Data</Label>
            <Input
              id="income-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Adicionar Receita
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}