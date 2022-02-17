import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "./FirebaseUtils";
import SignInButton from "./LoginWithEmailPassword";
import GoogleButton from "./SignInWithGoogle";
import SignUp from "./SignupWithEmailPassword";

const AuthorizationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const callPrivateApi = async () => {
    const response = await fetch("http://localhost:8000/api/verified", {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    window.alert(`message: ${data.message} user: ${data.user}`);
  };
  const refreshToken = async () => {
    const user = await auth.currentUser;
    if (user) {
      let idToken = await user.getIdToken(true);
      setToken(idToken);
    }
  };
  return (
    <Center p={4}>
      <VStack spacing={8}>
        <Heading>Authorization Form</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <VStack>
          <HStack>
            <SignInButton
              email={email}
              password={password}
              callback={setToken}
            />
            <SignUp email={email} password={password} callback={setToken} />
          </HStack>
          <HStack>
            <GoogleButton callback={setToken} />
          </HStack>
          <HStack>
            <Button onClick={callPrivateApi}>Call Private endpoint</Button>
            <Button onClick={refreshToken}>Refresh Token</Button>
          </HStack>
        </VStack>
        <Container>Token: {token}</Container>
      </VStack>
    </Center>
  );
};

export default AuthorizationForm;
