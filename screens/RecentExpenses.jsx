import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { setExpenses } from "../store/expenses";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const expenses = useSelector((state) => state.expensesReducer.expenses);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const dispatch = useDispatch();

  useEffect(()=>{
    async function getExpenses(){
      setIsLoading(true)
      try{
        const expenses = await fetchExpenses()
        dispatch(setExpenses({expenses}))
      } catch (err){
        setError("Could not fetch expenses!")
      }
      setIsLoading(false)
    }
    getExpenses()
  }, [])

 
  if (isLoading){
    return <LoadingOverlay/>
  }

  const errorConfirmHandler = () => {
    setError(null)
  }

  if (error){
    return <ErrorOverlay message={error} onConfirm={errorConfirmHandler}/>
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return new Date(expense.date) > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
