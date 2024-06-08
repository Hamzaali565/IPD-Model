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
import IPDMaster from "./Screens/IPD/Masters/IPDMaster";
import WardCharges from "./Screens/IPD/Masters/Ward Charges/WardCharges";
import ServiceCharges from "./Screens/IPD/Masters/Service Charges/ServiceCharges";
import Port from "./Screens/PortScreen/Port";
import ConsultantCharges from "./Screens/IPD/Masters/Consultant Charges/ConsultantCharges";
import DSCharges from "./Screens/IPD/Masters/DS Charges/DSCharges";

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
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdmaster/*" element={<IPDMaster />}>
                <Route path="wardcharges" element={<WardCharges />} />
                <Route path="servicecharges" element={<ServiceCharges />} />
                <Route path="dscharges" element={<DSCharges />} />
                <Route
                  path="consultantcharges"
                  element={<ConsultantCharges />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/mainpage" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
