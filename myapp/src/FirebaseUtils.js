import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "__YOUR_API_KEY__",
  authDomain: "__YOUR_AUTH_DOMAIN__",
  projectId: "__Your_PROJECT_ID__",
  storageBucket: "__BUCKET__",
  messagingSenderId: "___sender_id__",
  appId: "__appid__",
  measurementId: "optional",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
