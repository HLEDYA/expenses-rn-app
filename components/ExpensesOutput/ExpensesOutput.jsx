import React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-11-08"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some tomatoes",
    amount: 5.99,
    date: new Date("2021-12-08"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 19.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A pen",
    amount: 1.99,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Some tomatoes",
    amount: 5.99,
    date: new Date("2021-12-08"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 19.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "A pen",
    amount: 1.99,
    date: new Date("2022-02-18"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
