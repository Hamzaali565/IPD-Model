import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleInput from "../../../../Components/SimpleInput/SimpleInput";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import LabelledTextArea from "../../../../Components/LabeledTextArea/LabelledTextArea";
import ButtonDis from "../../../../Components/Button/ButtonDis";
const DischargeSummary = () => {
  const [dischargeType, setDischargeType] = useState([]);
  useEffect(() => {
    setDischargeType([
      { name: "--" },
      { name: "Brought Dead" },
      { name: "Expired" },
      { name: "LAMA" },
      { name: "Refer To" },
      { name: "Satisfactory" },
    ]);
  }, []);
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Discharge Summary"} />
        <div className="flex justify-center">
          <AdmissionModal title={"Select Admission No."} />
        </div>
        <div className="md:grid md:grid-cols-2">
          {/* Patient Details */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <CenterHeading title={"Patient Details"} />
            <div className="flex flex-col items-center space-y-2 mt-2">
              <LabeledInput
                disabled={true}
                label={"Patient Name"}
                placeholder={"Patient Name"}
              />
              <LabeledInput
                disabled={true}
                label={"Admission No"}
                placeholder={"Admission No"}
              />
              <LabeledInput
                disabled={true}
                label={"Mr No"}
                placeholder={"Mr No"}
              />
              <LabeledInput
                disabled={true}
                label={"Consultant Name"}
                placeholder={"Consultant Name"}
              />
              <LabeledInput
                disabled={true}
                label={"Party"}
                placeholder={"Party"}
              />
            </div>
          </div>
          {/* Discharge Details */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <CenterHeading title={"Discharge Details"} />
            <div className="flex flex-col items-center space-y-2">
              <ConsultantModal title={"Select Consultant Name"} />
              <LabeledInput
                disabled={true}
                label={"Discharge Consultant"}
                placeholder={"Discharge Consultant"}
              />
              <SimpleDropDown
                DropDownLabel={"Discharge Condition"}
                data={dischargeType}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl ">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <LabelledTextArea
            label={"Presenting Complaints"}
            placeholder={"Presenting Complaints"}
          />
          <LabelledTextArea label={"Diagnosis"} placeholder={"Diagnosis"} />
          <LabelledTextArea
            label={"Relevant Investigation"}
            placeholder={"Relevant Investigation"}
          />
          <LabelledTextArea
            label={"Hospital Course"}
            placeholder={"Hospital Course"}
          />
          <LabelledTextArea
            label={"Date of Surgery"}
            placeholder={"Date of Surgery"}
          />
          <LabelledTextArea
            label={"Operative Procedure"}
            placeholder={"Operative Procedure"}
          />
          <LabelledTextArea
            label={"Pending Reports"}
            placeholder={"Pending Reports"}
          />
          <LabelledTextArea
            label={"Instruction on Discharge"}
            placeholder={"Instruction on Discharge"}
          />
          <LabelledTextArea
            label={"Medication on Discharge"}
            placeholder={"Medication on Discharge"}
          />
          <LabelledTextArea label={"Follow Up"} placeholder={"Follow Up"} />
          <LabelledTextArea
            label={"Condition on Discharge"}
            placeholder={"Condition on Discharge"}
          />
        </div>
        <div className="flex flex-col items-center space-y-2 mt-2 md:flex-row md:justify-center md:items-center md:space-x-2 md:space-y-0">
          <ButtonDis title="Save" />
          <ButtonDis title="Print" />
          <ButtonDis title="Refresh" />
        </div>
      </div>
    </div>
  );
};

export default DischargeSummary;
