import { Button } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseUtils";

const SignInButton = ({ email, password, callback }) => {
  const signInUser = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      const user = res.user;
      let idToken = await user.getIdToken(true);
      callback(idToken);
      // Verify and register user with backend
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${idToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      window.alert(e.code);
    }
  };
  return <Button onClick={signInUser}>Login</Button>;
};

export default SignInButton;
