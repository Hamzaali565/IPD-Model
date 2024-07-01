import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import SimpleInput from "../../../../Components/SimpleInput/SimpleInput";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../Components/Modal/Loader";

const PaymentReciept = () => {
  const [paymentType, setPaymentType] = useState("");
  const [location, setLocation] = useState("");
  const [paymentAgainst, setPaymentAgaisnt] = useState("");
  const [amount, setAmount] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [paymentAgainstData, setPaymentAgainstData] = useState([]);
  const [paymentTypeData, setPaymentTypeData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);
  let shiftData = useSelector((state) => state.shift);

  console.log(shiftData);

  useEffect(() => {
    setPaymentTypeData([
      { name: "--" },
      { name: "Cash" },
      { name: "Credit Card" },
      { name: "Online" },
      { name: "Cheque" },
      { name: "Pay Order" },
    ]);

    setPaymentAgainstData([
      { name: "--" },
      { name: "Advance Admission" },
      { name: "Advance ER" },
    ]);

    setLocationData([
      { name: "--" },
      { name: "Main Reception" },
      { name: "OPD Recetion" },
    ]);
  }, [toggle]);

  //function
  const resetData = () => {
    setPaymentType("");
    setLocation("");
    setLocationData([]);
    setPaymentAgainstData([]);
    setPaymentTypeData([]);
    setPaymentAgaisnt("");
    setAmount(null);
    setRemarks("");
    setMrInfo(null);

    setToggle(!toggle);
  };

  const checkValidation = () => {
    try {
      if (!paymentAgainst) throw new Error("PLEASE SELECT PAYMENT AGAINST !!!");
      if (!paymentType) throw new Error("PLEASE SELECT PAYMENT TYPE !!!");
      if (!location) throw new Error("PLEASE SELECT LOCATION !!!");
      if (mrInfo === null) throw new Error("PLEASE SELECT ADMISSION NO.");
      if (!amount) throw new Error("PLEASE ENTER AMOUNT !!!");
      submitPayment();
    } catch (error) {
      ErrorAlert({ text: error.message, timer: 2000 });
    }
  };

  // api
  const submitPayment = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/paymentreciept`,
        {
          paymentType,
          location,
          paymentAgainst,
          amount,
          shiftNo: shiftData[0].ShiftNo,
          againstNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          remarks,
          createdUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      console.log("response of submitPayment", response.data.data);
      SuccessAlert({ text: "PAYMENT CREATED SUCCESSFULLY !!!", timer: 2000 });
      resetData();
      setOpen(false);
    } catch (error) {
      console.log("Error of submitPayment", error.response);
      ErrorAlert({ text: "SOMETHING WENT WRONG !!!", timer: 2000 });
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Payment Receipt"} />
        <div className="flex flex-col items-center space-y-2">
          <SimpleDropDown
            DropDownLabel={"Payment Against"}
            data={paymentAgainstData}
            onChange={(e) => setPaymentAgaisnt(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Payment Type"}
            data={paymentTypeData}
            onChange={(e) => setPaymentType(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Collecting Location"}
            data={locationData}
            onChange={(e) => setLocation(e)}
          />
          {paymentAgainst === "Advance Admission" && (
            <div className="flex items-center flex-col space-y-2">
              {paymentAgainst === "Advance Admission" ? (
                <AdmissionModal
                  title={"Select AdmissionNo."}
                  onClick={(e) => setMrInfo(e)}
                />
              ) : (
                ""
              )}

              <LabeledInput
                disabled={true}
                placeholder={"Patient Name"}
                label={"Patient Name"}
                value={
                  mrInfo !== null
                    ? `${mrInfo.patientType} ${mrInfo.patientName}  ${mrInfo.relativeType} ${mrInfo.relativeName}`
                    : ""
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Admission No"}
                label={"Admission No"}
                value={mrInfo !== null ? mrInfo?.admissionNo : ""}
              />
              <LabeledInput
                disabled={true}
                placeholder={"Mr No"}
                label={"Mr No"}
                value={mrInfo !== null ? mrInfo?.mrNo : ""}
              />
            </div>
          )}
          <LabeledInput
            type={"Number"}
            placeholder={"Amount"}
            label={"Amount"}
            value={amount === null ? "" : amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
          <LabeledInput
            placeholder={"Remarks"}
            label={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
          />
          <div className="flex items-center space-x-2">
            <ButtonDis title={"Save"} onClick={checkValidation} />
            <ButtonDis title={"Refresh"} onClick={resetData} />
          </div>
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default PaymentReciept;
