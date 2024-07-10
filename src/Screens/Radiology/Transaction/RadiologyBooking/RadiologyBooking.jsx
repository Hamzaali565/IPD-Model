import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../../Components/Modal/MRModal";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import PartyModal from "../../../../Components/Modal/PartyModal";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import RadiologyServiceModal from "../../../../Components/Modal/RadiologyServiceModal";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { ErrorAlert } from "../../../../Components/Alert/Alert";

const RadiologyBooking = () => {
  const [mrInfo, setmrInfo] = useState(null);
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState(0);

  const SumAmount = (e) => {
    setServiceDetails(e);
    let sum = 0;
    e.map((item) => {
      sum += +item.amount;
    });
    setAmount(sum);
  };
  const refreshData = () => {
    setmrInfo(null);
    setParty(null);
    setConsultant(null);
    setServiceDetails([]);
    setRemarks("");
    setAmount(0);
  };
  const CheckValidation = () => {
    try {
      if (mrInfo === null) throw new Error("PLEASE SELECT MR NO");
    } catch (error) {
      ErrorAlert({ text: error?.message, timer: 2000 });
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Booking"} />
        <div className="flex items-center flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center mt-2">
          <MRModel title={"Create Mr No"} />
          <BasicModal title={"Select Mr No"} onClick={(e) => setmrInfo(e)} />
          <PartyModal title={"Select Party"} onClick={(e) => setParty(e)} />
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => setConsultant(e)}
          />
          <RadiologyServiceModal
            title={"Select Tests"}
            modalAdmissionNo={party !== null ? party?.name : ""}
            onClick={(e) => SumAmount(e)}
          />
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Details"} />
        <div className="flex items-center flex-col space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-2 md:justify-items-center ">
          <LabeledInput
            disabled={true}
            label={"Patient Name"}
            placeholder={"Patient Name"}
            value={
              mrInfo !== null
                ? `${mrInfo.patientType} ${mrInfo.patientName}  ${mrInfo.relativeType} ${mrInfo.relativeName}`
                : ""
            }
          />
          <LabeledInput
            disabled={true}
            label={"Age"}
            placeholder={"Age"}
            value={
              mrInfo !== null
                ? `${mrInfo?.ageYear ? mrInfo?.ageYear : "0"}Years ${
                    mrInfo?.ageMonth ? mrInfo?.ageMonth : "0"
                  }Months ${mrInfo?.ageDay ? mrInfo?.ageDay : "0"} Days`
                : ""
            }
          />
          <LabeledInput
            disabled={true}
            label={"Cell No"}
            placeholder={"Cell No"}
            value={mrInfo !== null ? mrInfo?.cellNo : ""}
          />
          <LabeledInput
            disabled={true}
            label={"CNIC No"}
            placeholder={"CNIC No"}
            value={mrInfo !== null ? mrInfo?.cnicNo : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Address"}
            placeholder={"Address"}
            value={mrInfo !== null ? mrInfo?.address : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Gender"}
            placeholder={"Gender"}
            value={mrInfo !== null ? mrInfo?.gender : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Performed Consultant"}
            placeholder={"Performed Consultant"}
            value={consultant !== null ? consultant?.name : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Party"}
            placeholder={"Party"}
            value={party !== null ? party?.name : ""}
          />
          <LabeledInput
            label={"Remarks"}
            placeholder={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <LabeledInput
            disabled={true}
            label={"Amount Recieved"}
            placeholder={"Amount Recieved"}
            value={amount}
          />
        </div>
        {mrInfo !== null && (
          <p className="flex justify-center text-[12px] mt-4 text-blue-700 font-bold">
            This MR No is created/updated by {mrInfo?.updatedUser} on{" "}
            {mrInfo?.updatedOn}{" "}
          </p>
        )}
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Tests Details"} />

        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p className="">S. No</p>
            <p className="">Test Name</p>
            <p className="">No. of Times</p>
            <p className="">Amount</p>
          </div>
        </div>
        {serviceDetails.length > 0 &&
          serviceDetails.map((service, index) => (
            <div className="container mx-auto mt-3">
              <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p className="">{index + 1}</p>
                <p className="">{service?.serviceName}</p>
                <p className="">{service?.quantity}</p>
                <p className="">{service?.amount}</p>
              </div>
            </div>
          ))}
        <div className="flex flex-col items-center space-y-2 mt-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center">
          <ButtonDis title={"Save"} onClick={CheckValidation} />
          <ButtonDis title={"Print"} />
          <ButtonDis title={"Refresh"} onClick={refreshData} />
        </div>
      </div>
    </div>
  );
};

export default RadiologyBooking;
