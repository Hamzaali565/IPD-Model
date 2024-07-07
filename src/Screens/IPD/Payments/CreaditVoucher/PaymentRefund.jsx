import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../Components/Modal/Loader";
import BillToRefundModal from "../../../../Components/Modal/BillToRefundModal";

const PaymentRefund = () => {
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
  const [refundData, setRefundData] = useState(null);

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);
  let shiftData = useSelector((state) => state.shift);

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
      { name: "Agaisnt IPD Bill" },
      { name: "Agaisnt ER Bill" },
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
    setRefundData(null);

    setToggle(!toggle);
  };

  const checkValidation = () => {
    try {
      if (!paymentAgainst) throw new Error("PLEASE SELECT REFUND AGAINST !!!");
      if (!paymentType) throw new Error("PLEASE SELECT REFUND TYPE !!!");
      if (!location) throw new Error("PLEASE SELECT LOCATION !!!");
      if (mrInfo === null) throw new Error("PLEASE SELECT BILL NO.");
      submitRefund();
    } catch (error) {
      ErrorAlert({ text: error.message, timer: 2000 });
    }
  };

  // api
  const getBill = async (data) => {
    try {
      setMrInfo(data);
      const response = await axios.get(
        `${url}/billtorefund?billNo=${data?.billNo}`,
        { withCredentials: true }
      );
      setRefundData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log("Error of getBill", error);
    }
  };

  // api
  const submitRefund = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/paymentrefund`,
        {
          refundAgainst: paymentAgainst,
          refundType: paymentType,
          location,
          refundAmount: refundData?.totalRefund,
          shiftNo: shiftData[0].ShiftNo,
          againstNo: mrInfo?.billNo,
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
        <CenterHeading title={"Payment Refund"} />
        <div className="flex flex-col items-center space-y-2">
          <SimpleDropDown
            DropDownLabel={"Refund Agaisnt"}
            data={paymentAgainstData}
            onChange={(e) => setPaymentAgaisnt(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Refund Type"}
            data={paymentTypeData}
            onChange={(e) => setPaymentType(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Collecting Location"}
            data={locationData}
            onChange={(e) => setLocation(e)}
          />
          {paymentAgainst === "Agaisnt IPD Bill" && (
            <div className="flex items-center flex-col space-y-2">
              {paymentAgainst === "Agaisnt IPD Bill" ? (
                <BillToRefundModal
                  title={"Select Bill No"}
                  onClick={(e) => getBill(e)}
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
            placeholder={"Refund Amount"}
            label={"Refund Amount"}
            value={refundData !== null ? refundData?.totalRefund : 0}
            disabled={true}
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

export default PaymentRefund;
