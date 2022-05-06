import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Root from "./navigation/Root";
import store from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Root></Root>
          {/* <Tabs></Tabs> */}
          {/* <Stack></Stack> */}
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
