import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import FullScreenModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import moment from "moment";

const Reservation = () => {
  const [consultant, setConsultant] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");

  const shifData = useSelector((state) => state.shift);
  useEffect(() => {
    console.log("Shift Data", shifData);
  }, []);

  // function
  const refresh = () => {
    setConsultant(null);
    setMrInfo(null);
    setFromDate("");
    setToDate("");
    setAmount("");
  };
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
          </div>
          {mrInfo !== null && (
            <div className=" md:flex md:justify-between md:items-center">
              <p className="text-justify">
                Patient Name: {mrInfo.patientType} {mrInfo.patientName}{" "}
                {mrInfo.relativeType} {mrInfo.relativeName}
              </p>
              <p className="text-center">Gender: {mrInfo.gender} </p>
              <p className="text-center">Cell No.: {mrInfo.cellNo}</p>
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
            value={fromDate}
          />
          <LabeledInput
            label={"To Date"}
            type={"date"}
            onChange={(e) => handleDate(e.target.value, "toDate")}
            value={toDate}
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
        {consultant !== null && (
          <p className="text-center">Consultant Name: {consultant?.name}</p>
        )}
      </div>

      {/* paymnet */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"PAYMENT"} />
        <div className="flex justify-center mt-3">
          <LabeledInput
            label={"AMOUNT"}
            placeholder={2000}
            type={"number"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          <ButtonDis title={"SUBMIT"} />
          <ButtonDis title={"Refresh"} onClick={refresh} />
          <ButtonDis title={"Print"} />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
