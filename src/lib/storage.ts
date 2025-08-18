import { Expense, Income, MonthlyData } from '@/types/expense';

const STORAGE_KEY = 'calculadora-orcamento-data';

export const storageUtils = {
  // Get all monthly data
  getAllData(): Record<string, MonthlyData> {
    if (typeof window === 'undefined') return {};
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return {};
    }
  },

  // Get data for a specific month
  getMonthData(monthKey: string): MonthlyData | null {
    const allData = this.getAllData();
    const monthData = allData[monthKey];
    
    if (!monthData) return null;
    
    // Migrate old data format to new format
    if (!monthData.incomes) {
      const migratedData = {
        month: monthData.month,
        expenses: monthData.expenses || [],
        incomes: [],
        totalExpenses: monthData.totalAmount || 0,
        totalIncomes: 0,
        balance: -(monthData.totalAmount || 0),
      };
      
      // Save migrated data
      allData[monthKey] = migratedData;
      this.saveAllData(allData);
      
      return migratedData;
    }
    
    return monthData;
  },

  // Initialize empty month data
  initializeMonth(monthKey: string): MonthlyData {
    return {
      month: monthKey,
      expenses: [],
      incomes: [],
      totalExpenses: 0,
      totalIncomes: 0,
      balance: 0,
    };
  },

  // Calculate totals for a month
  calculateTotals(monthData: MonthlyData): MonthlyData {
    const totalExpenses = monthData.expenses.reduce((total, exp) => total + exp.amount, 0);
    const totalIncomes = monthData.incomes.reduce((total, inc) => total + inc.amount, 0);
    const balance = totalIncomes - totalExpenses;

    return {
      ...monthData,
      totalExpenses,
      totalIncomes,
      balance,
    };
  },

  // Save expense to a specific month
  saveExpense(monthKey: string, expense: Expense): void {
    const allData = this.getAllData();
    
    if (!allData[monthKey]) {
      allData[monthKey] = this.initializeMonth(monthKey);
    }

    // Add expense with proper date conversion
    const expenseToSave = {
      ...expense,
      date: new Date(expense.date),
    };
    
    allData[monthKey].expenses.push(expenseToSave);
    allData[monthKey] = this.calculateTotals(allData[monthKey]);

    this.saveAllData(allData);
  },

  // Save income to a specific month
  saveIncome(monthKey: string, income: Income): void {
    const allData = this.getAllData();
    
    if (!allData[monthKey]) {
      allData[monthKey] = this.initializeMonth(monthKey);
    }

    // Add income with proper date conversion
    const incomeToSave = {
      ...income,
      date: new Date(income.date),
    };
    
    allData[monthKey].incomes.push(incomeToSave);
    allData[monthKey] = this.calculateTotals(allData[monthKey]);

    this.saveAllData(allData);
  },

  // Remove expense from a specific month
  removeExpense(monthKey: string, expenseId: string): void {
    const allData = this.getAllData();
    
    if (allData[monthKey]) {
      allData[monthKey].expenses = allData[monthKey].expenses.filter(
        (exp) => exp.id !== expenseId
      );
      allData[monthKey] = this.calculateTotals(allData[monthKey]);
      
      this.saveAllData(allData);
    }
  },

  // Remove income from a specific month
  removeIncome(monthKey: string, incomeId: string): void {
    const allData = this.getAllData();
    
    if (allData[monthKey]) {
      allData[monthKey].incomes = allData[monthKey].incomes.filter(
        (inc) => inc.id !== incomeId
      );
      allData[monthKey] = this.calculateTotals(allData[monthKey]);
      
      this.saveAllData(allData);
    }
  },

  // Save all data to localStorage
  saveAllData(data: Record<string, MonthlyData>): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Get available months
  getAvailableMonths(): string[] {
    const allData = this.getAllData();
    return Object.keys(allData).sort().reverse(); // Most recent first
  },

  // Generate month key from date
  getMonthKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  },

  // Format month key for display
  formatMonthDisplay(monthKey: string): string {
    const [year, month] = monthKey.split('-');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  },
};