import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

interface FirebaseContextType {
  signupUserWithEmailAndPassword: (email: string, password: string) => void;
  loginUserWithEmailAndPassword: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  isLoggedin: boolean;
}

interface FirebaseProviderProps {
  children: ReactNode;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = (): FirebaseContextType | null => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const isLoggedin = user ? true : false;

  const signupUserWithEmailAndPassword = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, googleProvider);
  };
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        loginWithGoogle,
        isLoggedin,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
