import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {


  const [formIsValid, setFormIsValid] = useState(true)

  const [inputs, setInputs] = useState({
    amount: {value: defaultValues ? defaultValues.amount.toString() : "", isValid: true},
    date: { value: defaultValues ? defaultValues.date : "", isValid: true},
    description: {value: defaultValues ? defaultValues.description : "", isValid: true},
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    setFormIsValid( amountIsValid && dateIsValid && descriptionIsValid)

    if (amountIsValid && dateIsValid && descriptionIsValid){
      onSubmit(expenseData);
    } else {
      //Alert.alert("Invalid input", "Please check your input values")
      setInputs( (currInputs) => {
        return {
          amount: {value: currInputs.amount.value, isValid: amountIsValid},
          date: {value: currInputs.date.value, isValid: dateIsValid},
          description: {value: currInputs.description.value, isValid: descriptionIsValid}
        }
      })
    }

  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={inputs.date.isValid}
          textInputConfig={{
            //keyboardType: "number-pad",
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={inputs.date.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
          // autoCorrect: false, // default true
          // autoCapitalize: "none" // default sentence
        }}
      />
      {!formIsValid && <Text style={styles.errorText}>
        Invalid input values - please check entered data
      </Text>}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
