import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useEffect, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../store/actions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      console.log("input update case");
      const updatedInputValues = {
        ...state.inputValues,
        [action.inputType]: action.value,
      };
      const updatedFormInputValidity = {
        ...state.inputValidity,
        [action.inputType]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (let key in updatedFormInputValidity) {
        updatedFormIsValid =
          updatedFormIsValid && updatedFormInputValidity[key];
      }
      console.log("input add case->", {
        inputValues: updatedInputValues,
        inputValidity: updatedFormInputValidity,
        formIsValid: updatedFormIsValid,
      });
      return {
        inputValues: updatedInputValues,
        inputValidity: updatedFormInputValidity,
        formIsValid: updatedFormIsValid,
      };
    default:
      console.log("default");
      return state;
  }
};

const EditProductScreen = (props) => {
  const paramId = props.navigation.getParam("productId");
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === paramId)
  );
  const [formState, dispatchFormAction] = useReducer(formReducer, {
    inputValues: {
      title: selectedProduct ? selectedProduct.title : "",
      imageUrl: selectedProduct ? selectedProduct.imageUrl : "",
      price: selectedProduct ? selectedProduct.price : "",
      desc: selectedProduct ? selectedProduct.description : "",
    },
    inputValidity: {
      title: selectedProduct ? true : false,
      imageUrl: selectedProduct ? true : false,
      price: selectedProduct ? true : false,
      desc: selectedProduct ? true : false,
    },
    formIsValid: selectedProduct ? true : false,
  });

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, []);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check error(s) in the form", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }
    if (paramId) {
      dispatch(
        Actions.updateProduct(
          paramId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.desc
        )
      );
    } else {
      dispatch(
        Actions.createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.desc,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, paramId, formState, Actions]);

  // console.log("title", title);

  const inputChangeHandler = (value, inputType) => {
    let isValid = false;
    if (value.trim().length > 0) {
      isValid = true;
    }
    console.log("input handler");
    dispatchFormAction({ type: FORM_INPUT_UPDATE, value, isValid, inputType });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={(text) => inputChangeHandler(text, "title")}
            autoCapitalize="sentences"
            placeholder="Enter title"
            returnKeyType="next"
          />
          {!formState.inputValidity.title && (
            <Text>This field is required</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => inputChangeHandler(text, "imageUrl")}
          />
        </View>
        {!props.navigation.getParam("productId") && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={(text) => inputChangeHandler(text, "price")}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.desc}
            onChangeText={(text) => inputChangeHandler(text, "desc")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
