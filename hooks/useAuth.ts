import app from "@/lib/firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

export default function useAuth() {
  const signup = async (email: string, password: string) => {
    let result, error;

    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error = err;
    }

    return { result, error };
  };

  // sign in method with email and password through firebase
  const signin = async (email: string, password: string) => {
    let result, error;

    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error = err;
    }

    return { result, error };
  };

  return { signin, signup };
}
