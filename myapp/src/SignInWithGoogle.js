import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./FirebaseUtils";

const GoogleButton = ({ callback }) => {
  const onClick = async () => {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    console.log(user);
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
  };

  return <Button onClick={onClick}>SignIn with Google</Button>;
};

export default GoogleButton;
