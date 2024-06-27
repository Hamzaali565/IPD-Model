import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import SimpleInput from "../../../../Components/SimpleInput/SimpleInput";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";

const PaymentReciept = () => {
  const [paymentType, setPaymentType] = useState("");
  const [location, setLocation] = useState("");
  const [paymentAgainst, setPaymentAgaisnt] = useState("");
  const [amount, setAmount] = useState("");

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);
  let shiftData = useSelector((state) => state.shift);

  console.log(shiftData);

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Payment Receipt"} />
        <div className="flex flex-col items-center space-y-2">
          <SimpleDropDown
            DropDownLabel={"Payment Against"}
            data={[
              { name: "--" },
              { name: "Advance Admission" },
              { name: "Advance ER" },
            ]}
            onChange={(e) => setPaymentAgaisnt(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Payment Type"}
            data={[
              { name: "--" },
              { name: "Cash" },
              { name: "Credit Card" },
              { name: "Online" },
              { name: "Cheque" },
              { name: "Pay Order" },
            ]}
          />
          <SimpleDropDown
            DropDownLabel={"Collecting Location"}
            data={[
              { name: "--" },
              { name: "Main Reception" },
              { name: "OPD Recetion" },
            ]}
          />
          {paymentAgainst === "Advance Admission" && (
            <div className="flex items-center flex-col space-y-2">
              {paymentAgainst === "Advance Admission" ? (
                <AdmissionModal title={"Select AdmissionNo."} />
              ) : (
                ""
              )}

              <LabeledInput
                disabled={true}
                placeholder={"Patient Name"}
                label={"Patient Name"}
              />
              <LabeledInput
                disabled={true}
                placeholder={"Admission No"}
                label={"Admission No"}
              />
              <LabeledInput
                disabled={true}
                placeholder={"Mr No"}
                label={"Mr No"}
              />
            </div>
          )}
          <LabeledInput
            type={"Number"}
            placeholder={"Amount"}
            label={"Amount"}
          />
          <LabeledInput placeholder={"Remarks"} label={"Remarks"} />
        </div>
      </div>
    </div>
  );
};

export default PaymentReciept;
