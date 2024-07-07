import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import FullScreenModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import moment from "moment";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import MRModel from "../../../../Components/Modal/MRModal";
import Loader from "../../../../Components/Modal/Loader";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ReservationModal from "../../../../Components/Modal/ReservationModal";
import AllReservationModal from "../../../../Components/Modal/AllReservationModal";
import SimpleInput from "../../../../Components/SimpleInput/SimpleInput";

const Reservation = () => {
  const [consultant, setConsultant] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setlocation] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const shifData = useSelector((state) => state.shift);
  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);
  useEffect(() => {
    console.log("Shift Data", shifData[0]);
    setPaymentData([
      { name: "--" },
      { name: "Cash" },
      { name: "Cheque" },
      { name: "Credit Card" },
      { name: "Pay Order" },
      { name: "Online" },
    ]);
    setLocationData([
      { name: "--" },
      { name: "Main Reception" },
      { name: "OPD Reception" },
    ]);
  }, [!toggle]);

  const delateCollection = async () => {
    try {
      const response = await axios.delete(
        `${url}/deleteCollectionReservation`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // function
  const refresh = () => {
    setConsultant(null);
    setMrInfo(null);
    setReservationInfo(null);
    setFromDate("");
    setToDate("");
    setAmount("");
    setPaymentType("");
    setlocation("");
    setLocationData([]);
    setPaymentData([]);
    setToggle(!toggle);
  };
  // date Handler
  const handleDate = (value, key) => {
    const formattedDate = moment(value).format("DD/MM/YYYY"); // For display/logging
    const isoDate = moment(value).format("YYYY-MM-DD"); // For storing in state

    if (key === "toDate") {
      console.log("toDate:", formattedDate);
      setToDate(isoDate);
    } else if (key === "fromDate") {
      console.log("fromDate:", formattedDate);
      setFromDate(isoDate);
    }
  };
  const check = () => {
    if (mrInfo === null) {
      ErrorAlert({ text: "Please Select Mr Number.", timer: 1500 });
      return;
    }
    if (!fromDate || !toDate) {
      ErrorAlert({ text: "Please Select Both Dates.", timer: 1500 });
      return;
    }
    if (consultant === null) {
      ErrorAlert({ text: "Please Select Consultant.", timer: 1500 });
      return;
    }
    if (amount === "") {
      ErrorAlert({ text: "Please Enter Amount.", timer: 1500 });
      return;
    }
    handleSubmit();
  };
  // api
  const handleSubmit = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/reservation`,
        {
          mrNo: mrInfo.MrNo,
          fromDate,
          toDate,
          consultantId: consultant?._id,
          shiftNo: shifData[0]?.ShiftNo,
          shiftId: shifData[0]?._id,
          amount,
          createdUser: userData[0]?.userId,
          location,
          paymentType,
        },
        { withCredentials: true }
      );
      console.log("response of Submit Handler", response.data.data);
      SuccessAlert({ text: "RESERVATION CREATED SUCCESSFULLY", timer: 1500 });
      refresh();
      setOpen(false);
    } catch (error) {
      console.log("Error of Submit Handler", error);
      ErrorAlert({ text: error.response.data.message, timer: 1000 });
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation"} />

        <div className="mt-2">
          <div className="flex justify-center">
            <FullScreenModal
              title={"Select MR No."}
              onClick={(e) => {
                setMrInfo(e);
              }}
            />
            <MRModel title={"Create MR No."} onClick={(e) => setMrInfo(e)} />
          </div>
          <div className="flex justify-center">
            <AllReservationModal
              title={"Select Reservation No."}
              onClick={(e) => setReservationInfo(e)}
            />
          </div>
          {(mrInfo !== null || reservationInfo !== null) && (
            <div className="flex items-center flex-col space-y-2 mt-2">
              <LabeledInput
                disabled={true}
                placeholder={"Patient Name"}
                label={"Patient Name"}
                value={
                  mrInfo !== null
                    ? `${mrInfo?.patientType} ${mrInfo?.patientName} ${mrInfo?.relativeType} ${mrInfo?.relativeName}`
                    : `${reservationInfo?.patientType} ${reservationInfo?.patientName} ${reservationInfo?.relativeType} ${reservationInfo?.relativeName}`
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Gender"}
                label={"Gender"}
                value={
                  mrInfo !== null ? mrInfo?.gender : reservationInfo?.gender
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Cell No"}
                label={"Cell No"}
                value={mrInfo !== null ? mrInfo?.cellNo : "oho"}
              />
              <LabeledInput
                disabled={true}
                placeholder={"Mr No"}
                label={"Mr No"}
                value={mrInfo !== null ? mrInfo?.MrNo : reservationInfo?.mrNo}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation Period"} />
        <div className=" md:grid md:grid-cols-2 md:justify-items-center">
          <LabeledInput
            label={"From Date"}
            type={"date"}
            onChange={(e) => handleDate(e.target.value, "fromDate")}
            value={fromDate ? fromDate : reservationInfo?.fromDate}
          />
          <LabeledInput
            label={"To Date"}
            type={"date"}
            onChange={(e) => handleDate(e.target.value, "toDate")}
            value={toDate ? toDate : reservationInfo?.toDate}
          />
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Advised By"} />
        <div className="flex justify-center">
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => {
              setConsultant(e);
            }}
          />
        </div>
        {(consultant !== null || reservationInfo !== null) && (
          <div className="flex justify-center">
            <LabeledInput
              placeholder={"Consultant Name"}
              label={"Consultant Name"}
              value={
                consultant?.name
                  ? consultant?.name
                  : reservationInfo?.consultantName
              }
            />
          </div>
        )}
      </div>

      {/* paymnet */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"PAYMENT"} />
        <div className="flex flex-col items-center space-y-2 mt-3">
          <LabeledInput
            label={"AMOUNT"}
            placeholder={2000}
            type={"number"}
            value={amount ? amount : reservationInfo?.amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <SimpleDropDown
            DropDownLabel={"Location"}
            data={locationData}
            onChange={(e) => setlocation(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Payment Type"}
            data={paymentData}
            onChange={(e) => setPaymentType(e)}
          />
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          <ButtonDis title={"SUBMIT"} onClick={check} />
          <ButtonDis title={"Refresh"} onClick={refresh} />
          <ButtonDis title={"Print"} onClick={delateCollection} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default Reservation;
