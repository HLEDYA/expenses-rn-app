import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";

import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";

import { removeExpense, updateExpense, addExpense } from "../store/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import * as http from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const expenses = useSelector((state) => state.expensesReducer.expenses);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const dispatch = useDispatch();

  const errorConfirmHandler = () =>{
    setError(null)
  }

  const deleteExpenseHandler = () => {
    setIsLoading(true)
    try {
      http.deleteExpense(editedExpenseId)
      dispatch(removeExpense({ id: editedExpenseId }));
      navigation.goBack();
    } catch (err){
      setError("Could not delete the expense. Please try later!")
    }
    setIsLoading(false)    
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = async (expenseData) => {
    setIsLoading(true)
    try{
      if (isEditing) {
        dispatch(updateExpense({ id: editedExpenseId, expense: expenseData }));
        http.updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await http.storeExpense(expenseData)
        const expense = {id, ...expenseData};
        dispatch(addExpense({ expense }));
      }
      navigation.goBack();
    } catch (err) {
      setError("Could not save data, please try again later")
    }
    setIsLoading(false)
    
  };

  if (isLoading){
    return <LoadingOverlay/>
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorConfirmHandler}/>
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
