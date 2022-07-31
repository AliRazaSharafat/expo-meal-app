import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductNavigator from "./Navigation/ProductNavigator";
import * as Font from "expo-font";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "react-native";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoad, setFontLoad] = useState(false);
  if (!fontLoad) {
    <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoad(true)} />;
  }
  return (
    <Provider store={store}>
      <StatusBar />
      <ProductNavigator />
    </Provider>
  );
}
