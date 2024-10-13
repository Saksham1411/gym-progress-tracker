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
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

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
const firestore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

interface FirebaseContextType {
  signupUserWithEmailAndPassword: (email: string, password: string) => void;
  loginUserWithEmailAndPassword: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  isLoggedin: boolean;
  userEmail: string;
  handleCreateNewExercise: (name: string) => void;
  handleGetUserData: () => void;
  handleExerciseDataUpdate: (name: string, newData: object) => void;
  handleSignOut: () => void;
}

interface FirebaseProviderProps {
  children: ReactNode;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = (): FirebaseContextType | null =>
  useContext(FirebaseContext);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [userDbId, setUserDbId] = useState<any>(null);
  const [trigger, settrigger] = useState(true);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const isLoggedin = user ? true : false;

  const signupUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    await addDoc(collection(firestore, "exercises"), {
      userEmail: email,
      userID: res.user.uid,
    });
  };

  const loginUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(firebaseAuth, googleProvider);

    const userEmail = res.user.email;
    const collectionRef = collection(firestore, "exercises");
    const q = query(collectionRef, where("userEmail", "==", userEmail));
    const result = await getDocs(q);
    const id = result.docs.length === 0;
    if (id) {
      await addDoc(collection(firestore, "exercises"), {
        userEmail: res.user.email,
        userID: res.user.uid,
      });
    }
  };

  const handleSignOut = async () => {
    await signOut(firebaseAuth);
  };

  const handleCreateNewExercise = async (name: string) => {
    const userID = await user.uid;
    const dbId =
      userDbId === null ? await getDbIdofLoggedinUser(userID) : userDbId;
    const collectionRef = collection(firestore, "exercises", dbId, "exersice");
    await addDoc(collectionRef, { name, data: [] });
    settrigger(!trigger);
  };

  const handleExerciseDataUpdate = async (name: string, newData: object) => {
    const userID = await user.uid;
    const dbId =
      userDbId === null ? await getDbIdofLoggedinUser(userID) : userDbId;
    const collectionRef = collection(firestore, "exercises", dbId, "exersice");
    const q = query(collectionRef, where("name", "==", name));
    const result = await getDocs(q);
    const id = result.docs[0].id;
    const prevData = result.docs[0].data().data;
    const docRef = doc(firestore, "exercises", dbId, "exersice", id);
    await updateDoc(docRef, {
      data: [...prevData, newData],
    });
    settrigger(!trigger);
  };

  const getDbIdofLoggedinUser = async (userID: string) => {
    const collectionRef = collection(firestore, "exercises");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    const id = result.docs[0].id;
    setUserDbId(id);
    return id;
  };

  const handleGetUserData = async () => {
    const userID = await user.uid;
    const dbId =
      userDbId === null ? await getDbIdofLoggedinUser(userID) : userDbId;
    const collectionRef = collection(firestore, "exercises", dbId, "exersice");
    const result = await getDocs(collectionRef);
    const data = result.docs.map((item) => {
      return item.data();
    });
    return data;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        loginWithGoogle,
        isLoggedin,
        handleCreateNewExercise,
        handleGetUserData,
        handleExerciseDataUpdate,
        userEmail: user?.email,
        handleSignOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
