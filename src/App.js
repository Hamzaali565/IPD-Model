import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./Screens/Login/Login";
import MainPage from "./Screens/MainPage/MainPage";
import { setLoginToggle, setResponse } from "./Store/action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    CheckLog();
  }, []);

  const LoginCheck = useSelector((state) => state.toggle);
  const url = useSelector((state) => state.url);

  const CheckLog = async () => {
    try {
      const response = await axios.get(`${url}/product`, {
        withCredentials: true,
      });
      console.log("response of product api", response);
      dispatch(setLoginToggle(true));
      dispatch(setResponse(response.data.data));
    } catch (error) {
      console.log("error of product api", error);
      dispatch(setLoginToggle(false));
    }
  };

  return (
    <Router>
      <div>
        {LoginCheck === true ? (
          <Routes>
            <Route path="mainpage" element={<MainPage />} />
            <Route path="*" element={<Navigate to="/mainpage" replace />} />
          </Routes>
        ) : null}
        {LoginCheck === false ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
