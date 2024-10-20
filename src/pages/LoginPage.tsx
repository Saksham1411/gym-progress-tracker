import { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useFirebase } from "../context/Firebase";
import handleFirebaseError from "../lib/firebaseErorrs";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const LoginPage = () => {
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

  const submitHandler = (e: any) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      schema.parse(formData);
      firebase
        .loginUserWithEmailAndPassword(email, password)
        .then(() => {})
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
    <>
      {firebase.loadingLoggedinUser ? (
        <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
          Checking user already loggedIn
          <BarLoader />
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="h-[100vh] w-full flex flex-col gap-2 justify-center items-center"
        >
          <div className="font-bold text-2xl mb-4">Log in</div>
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
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
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
          </div>
          <button
            type="submit"
            className="border border-black bg-black text-white px-6 py-1 rounded-lg mt-2"
          >
            Login
          </button>
          <Link to={"/signup"} className="underline mt-2">
            Create a account
          </Link>

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
      )}
    </>
  );
};

export default LoginPage;
