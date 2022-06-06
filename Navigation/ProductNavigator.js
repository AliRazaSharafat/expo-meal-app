import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductsScreen from "../Screens/shop/ProductsScreen";
import ProductDetailsScreen from "../Screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsScreen,
    ProductDetail: ProductDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "All Products",
    },
  }
);

export default createAppContainer(ProductsNavigator);
