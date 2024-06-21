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
import { setLoginToggle, setResponse, setShift } from "./Store/action";
import IPDMaster from "./Screens/IPD/Masters/IPDMaster";
import WardCharges from "./Screens/IPD/Masters/Ward Charges/WardCharges";
import ServiceCharges from "./Screens/IPD/Masters/Service Charges/ServiceCharges";
import Port from "./Screens/PortScreen/Port";
import ConsultantCharges from "./Screens/IPD/Masters/Consultant Charges/ConsultantCharges";
import DSCharges from "./Screens/IPD/Masters/DS Charges/DSCharges";
import IPDPatientMaster from "./Screens/IPD/Patient/IPDPatientMaster/IPDPatientMaster";
import PatientRegistration from "./Screens/IPD/Patient/PatientRegistration/PatientRegistration";
import Reservation from "./Screens/IPD/Patient/Reservation/Reservation";
import IPDShiftMaster from "./Screens/IPD/Shift/IPDShiftMaster";
import CreateShift from "./Screens/IPD/Shift/CreateShift";
import Addmission from "./Screens/IPD/Patient/Addmission/Addmission";
import IPDTransactionMaster from "./Screens/IPD/Transaction/IPDTransactionMaster/IPDTransactionMaster";
import ConsultantVisit from "./Screens/IPD/Transaction/ConsultantVisit/ConsultantVisit";
import IPDWardCharges from "./Screens/IPD/Transaction/WardCharges/IPDWardCharges";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    CheckLog();
    getShift();
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
  const getShift = async () => {
    try {
      const response = await axios.get(`${url}/shift`, {
        withCredentials: true,
      });
      dispatch(setShift(response.data.data));
      console.log("response of getData", response);
    } catch (error) {
      console.log("Error of getShift", error);
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
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdPatient/*" element={<IPDPatientMaster />}>
                <Route
                  path="patientRegistration"
                  element={<PatientRegistration />}
                />
                <Route path="reservation" element={<Reservation />} />
                <Route path="admission" element={<Addmission />} />
              </Route>
            </Route>
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdShift/*" element={<IPDShiftMaster />}>
                <Route path="createShift" element={<CreateShift />} />
              </Route>
            </Route>
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="transaction/*" element={<IPDTransactionMaster />}>
                <Route path="servicereversal" element={<CreateShift />} />
                <Route path="consultantvisit" element={<ConsultantVisit />} />
                <Route path="ipdwardcharges" element={<IPDWardCharges />} />
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
