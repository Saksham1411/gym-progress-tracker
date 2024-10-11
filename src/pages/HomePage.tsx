import { useEffect } from "react";
import Accordian from "../components/Accordian/Accordian";
import Header from "../components/Header/Header";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const firebase: any = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (!firebase.isLoggedin) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  return (
    <div>
      <Header />
      <Accordian />
    </div>
  );
};

export default HomePage;
