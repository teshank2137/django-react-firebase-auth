import { Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseUtils";

const SignUp = ({ email, password, callback }) => {
  const registerNewUser = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(res.user);
      let idToken = await user.getIdToken(true); //true is for refreshing token
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
  return <Button onClick={registerNewUser}>Sign Up</Button>;
};

export default SignUp;
