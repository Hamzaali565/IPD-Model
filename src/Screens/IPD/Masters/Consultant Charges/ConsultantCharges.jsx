import React from "react";
import PAgeTitle from "../../../../Components/Page Title/PAgeTitle";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";

const ConsultantCharges = () => {
  const data = [{ name: "--" }, { name: "Cash" }];
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant Charges"} />
      {/* dropDowns */}
      <div className="grid grid-cols-2">
        <SimpleDropDown DropDownLabel={"Party"} data={data} />
        <SimpleDropDown DropDownLabel={"Ward"} />
      </div>
      {/* data */}
      <div>
        {/* header */}
        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p className="">S. No</p>
            <p className="">Dr. Name</p>
            <p className="">Charges</p>
            <p className="">Status</p>
          </div>
        </div>

        {/* Detail */}
        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
            <p>1</p>
            <p>DR. JAHAN ARA MONA ALVI</p>
            <p>
              <input
                type="number"
                className="w-24 rounded-xl p-1"
                placeholder="Charges"
                name=""
                // value={item?.bedCharges}
                // onChange={(e) =>
                //   handlerEffect(
                //     e.target.value,
                //     item._id,
                //     "charges",
                //     item?.bedId
                //   )
                // }
                id=""
              />
            </p>
            <p>
              <input
                type="checkbox"
                // checked={item?.status}
                name=""
                id=""
                // onChange={(e) =>
                //   handlerEffect(
                //     e.target.checked,
                //     item._id,
                //     "status",
                //     item?.bedId
                //   )
                // }
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantCharges;
