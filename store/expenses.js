import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: "2021-11-08",
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: "2022-01-05",
  },
  {
    id: "e3",
    description: "Some tomatoes",
    amount: 5.99,
    date: "2021-12-08",
  },
  {
    id: "e4",
    description: "A book",
    amount: 19.99,
    date: "2022-02-19",
  },
  {
    id: "e5",
    description: "A pen",
    amount: 1.99,
    date: "2022-02-18",
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.99,
    date: "2022-01-05",
  },
  {
    id: "e7",
    description: "Some tomatoes",
    amount: 5.99,
    date: "2021-12-08",
  },
  {
    id: "e8",
    description: "A book",
    amount: 19.99,
    date: "2022-02-19",
  },
  {
    id: "e9",
    description: "A pen",
    amount: 1.99,
    date: "2022-02-18",
  },
];

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: DUMMY_EXPENSES,
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload.expense);
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload.expenses.reverse(); // to show recent at top
    },
    removeExpense: (state, action) => {
      console.log(action.payload.id);
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
    updateExpense: (state, action) => {
      const expenseIdToBeUpdated = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const expenseToBeUpdated = state.expenses[expenseIdToBeUpdated];
      state.expenses[expenseIdToBeUpdated] = {
        ...expenseToBeUpdated,
        ...action.payload.expense,
      };
    },
  },
});

export default expensesSlice.reducer;
export const addExpense = expensesSlice.actions.addExpense;
export const setExpenses = expensesSlice.actions.setExpenses;
export const removeExpense = expensesSlice.actions.removeExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
