import { useState, useEffect } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import handleFirebaseError from "../lib/firebaseErorrs";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const firebase: any = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedin) {
      navigate("/");
    }
  }, [firebase, navigate]);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      schema.parse(formData);
      firebase
        .signupUserWithEmailAndPassword(email, password)
        .then(() => {
          toast.success("Account created successfully");
        })
        .catch((err: any) => {
          const msg = handleFirebaseError(err);
          toast.error(msg);
        });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.errors.forEach(({ path, message }) => {
          fieldErrors[path[0]] = message;
        });
        setErrors(fieldErrors);
      }
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="h-[100vh] w-full flex flex-col gap-2 justify-center items-center"
    >
      <div className="font-bold text-2xl mb-4">Sign up</div>
      <div className="flex flex-col w-1/2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="border border-black px-2 py-1 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>
      <div className="flex flex-col w-1/2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="border border-black px-2 py-1 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        className="border border-black bg-black text-white px-6 py-1 rounded-lg mt-2"
      >
        Signup
      </button>
      <div className="border-gray-900 border-opacity-60 border-t mt-4 py-4 w-[55%] flex justify-center">
        <button
          type="button"
          onClick={firebase.loginWithGoogle}
          className="border border-black font-semibold px-4 py-2 rounded-lg mt-2"
        >
          <i className="fa-brands fa-google pr-2"></i>Login with google
        </button>
      </div>
    </form>
  );
};

export default SignupPage;
