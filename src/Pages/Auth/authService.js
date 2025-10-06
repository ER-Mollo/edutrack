import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig";

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
