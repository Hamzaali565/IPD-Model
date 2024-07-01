import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import RunningPDF from "../../../../Components/RunningBillPdf/RunningPDF";
import Loader from "../../../../Components/Modal/Loader";

const RunningBill = () => {
  const [runningData, setRunningData] = useState([]);
  const [serviceCharges, setServiceCharges] = useState(0);
  const [wardCharges, setWardCharges] = useState(0);
  const [procedureCharges, setProcedureCharges] = useState(0);
  const [visitCharges, setVisitCharges] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [total, setTotal] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);
  const userData = useSelector((item) => item?.response);

  useEffect(() => {
    setTotal(wardCharges + visitCharges + procedureCharges + serviceCharges);
  }, [toggle]);

  const getData = async (e) => {
    refreshData();
    setOpen(true);
    try {
      const response = await axios.get(
        `${url}/runningbill?admissionNo=${e?.admissionNo}&mrNo=${e?.mrNo}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setRunningData(response?.data?.data);
      if (response?.data?.data?.serviceCharges?.length > 0) {
        const totalCharges = response?.data?.data?.serviceCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setServiceCharges(totalCharges);
        console.log("totalCharges", totalCharges);
      }
      if (response?.data?.data?.wardCharges?.length > 0) {
        const totalCharges = response?.data?.data?.wardCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setWardCharges(totalCharges);
      }
      if (response?.data?.data?.procedureCharges?.length > 0) {
        const totalCharges = response?.data?.data?.procedureCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setProcedureCharges(totalCharges);
      }
      if (response?.data?.data?.consultantVisit?.length > 0) {
        const totalCharges = response?.data?.data?.consultantVisit.reduce(
          (accumulator, item) => accumulator + item?.charges,
          0
        );
        setVisitCharges(totalCharges);
      }
      if (response?.data?.data?.depositDetails?.length > 0) {
        const totalCharges = response?.data?.data?.depositDetails.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setDeposit(totalCharges);
      }
      setToggle(!toggle);
      setOpen(false);
    } catch (error) {
      console.log("Error of Get Data", error);
      setOpen(false);
    }
  };
  const checkArray = () => {
    console.log("setRunningData", runningData);
    console.log("setRunningData", runningData.patientData.length);
  };

  const refreshData = () => {
    setRunningData([]);
    setServiceCharges(0);
    setWardCharges(0);
    setProcedureCharges(0);
    setVisitCharges(0);
    setTotal(0);
  };
  const handleButtonClick = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <RunningPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Running Bill"} />
        <div className="flex justify-center">
          <AdmissionModal title={"Select Admission No"} onClick={getData} />
        </div>
        {runningData?.patientData?.length > 0 && (
          <div className="md:grid md:grid-cols-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Patient Details"} />
              <div className="flex flex-col items-center space-y-2 mt-2">
                <LabeledInput
                  label={"Patinet Name"}
                  disabled={true}
                  placeholder={"Patinet Name"}
                  value={`${runningData?.patientData[0]?.patientType} ${runningData?.patientData[0]?.patientName} ${runningData?.patientData[0]?.relativeType} ${runningData?.patientData[0]?.relativeName}`}
                />
                <LabeledInput
                  label={"Age"}
                  disabled={true}
                  placeholder={"Age"}
                  value={`${runningData?.patientData[0]?.ageYear}`}
                />
                <LabeledInput
                  label={"Gender"}
                  disabled={true}
                  placeholder={"Gender"}
                  value={runningData?.patientData[0]?.gender}
                />
                <LabeledInput
                  label={"MrNo"}
                  disabled={true}
                  placeholder={"Mr No"}
                  value={runningData?.patientData[0]?.MrNo}
                />
                <LabeledInput
                  label={"Admission No"}
                  disabled={true}
                  placeholder={"Admission No"}
                  value={runningData?.activeWard[0]?.admissionNo}
                />
                <LabeledInput
                  label={"Party Name"}
                  disabled={true}
                  placeholder={"Party Name"}
                  value={runningData?.activeParty[0]?.party}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Service Details"} />
              <div className="flex items-center space-y-2 flex-col mt-2">
                <LabeledInput
                  disabled={true}
                  placeholder={"Service Charges"}
                  label={"Service Charges"}
                  value={serviceCharges}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Ward Charges"}
                  label={"Ward Charges"}
                  value={wardCharges}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Procedure Charges"}
                  label={"Procedure Charges"}
                  value={procedureCharges}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Consultant Visit Charges"}
                  label={"Consultant Visit Charges"}
                  value={visitCharges}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Medicine/Labs/Radiology Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Medicine Charges"}
                  label={"Medicine Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Laboratory Charges"}
                  label={"Laboratory Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Radiology Charges"}
                  label={"Radiology Charges"}
                  disabled={true}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Cash Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Total Amount"}
                  label={"Total Amount"}
                  disabled={true}
                  value={total}
                />
                <LabeledInput
                  placeholder={"Deposit Amount"}
                  label={"Deposit Amount"}
                  disabled={true}
                  value={deposit}
                />
                <LabeledInput
                  placeholder={"Recievable Amount"}
                  label={"Recievable Amount"}
                  disabled={true}
                  value={total - deposit > 0 ? total - deposit : 0}
                />
                <LabeledInput
                  placeholder={"Refunded Amount"}
                  label={"Refunded Amount"}
                  disabled={true}
                  value={total - deposit < 0 ? total - deposit : 0}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl md:col-span-2">
              <div className="flex flex-col items-center space-y-2 md:flex-row justify-center space-x-2">
                <ButtonDis title={"Print"} onClick={handleButtonClick} />
                <ButtonDis title={"Refresh"} onClick={() => refreshData()} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Loader title={"Data Loading ..."} onClick={open} />
    </div>
  );
};

export default RunningBill;
