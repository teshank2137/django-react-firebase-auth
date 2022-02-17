import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import AuthorizationForm from "./Auth";

function App() {
  return (
    <ChakraProvider>
      <AuthorizationForm />
    </ChakraProvider>
  );
}

export default App;
