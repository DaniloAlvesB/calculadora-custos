'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { storageUtils } from '@/lib/storage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  currentMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const availableMonths = storageUtils.getAvailableMonths();
  const currentMonthDisplay = storageUtils.formatMonthDisplay(currentMonth);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const [year, month] = currentMonth.split('-').map(Number);
    const currentDate = new Date(year, month - 1, 1);
    
    if (direction === 'prev') {
      currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    const newMonthKey = storageUtils.getMonthKey(currentDate);
    onMonthChange(newMonthKey);
  };

  const getCurrentMonthKey = () => {
    return storageUtils.getMonthKey(new Date());
  };

  const goToCurrentMonth = () => {
    onMonthChange(getCurrentMonthKey());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecionar Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            
            <div className="text-center">
              <p className="font-semibold text-lg">{currentMonthDisplay}</p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={goToCurrentMonth}
              className="flex-1"
            >
              Mês Atual
            </Button>
          </div>

          {/* Month Dropdown */}
          {availableMonths.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Ou selecione um mês com dados:
              </p>
              <Select value={currentMonth} onValueChange={onMonthChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um mês" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths.map((month) => (
                    <SelectItem key={month} value={month}>
                      {storageUtils.formatMonthDisplay(month)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}