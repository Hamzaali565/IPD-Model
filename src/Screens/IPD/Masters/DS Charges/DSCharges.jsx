import React from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";

const DSCharges = () => {
  // redux data
  const url = useSelector((item) => item.url);
  const UserData = useSelector((item) => item.response);
  const partyDetails = [{ name: "--" }, { name: "Cash" }];
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Direct Service Charges"} />

      <div className="md:grid md:grid-cols-2">
        <SimpleDropDown
          DropDownLabel={"Party"}
          data={partyDetails}
          //   onChange={handleDropDownChange}
        />
        <SimpleDropDown
          DropDownLabel={"Service Name"}
          //   data={ward.length > 0 ? ward : []}
          //   onChange={callData}
          //   onClick={partyCheck}
        />
      </div>

      {/* table header */}
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p className="">S. No</p>
          <p className="">Service Name</p>
          <p className="">Charges</p>
          <p className="">Status</p>
        </div>
      </div>
      {/* table data */}
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
          <p>1</p>
          <p>E.C.G Emergency</p>
          <p>
            <input
              type="number"
              className="w-24 rounded-xl p-1"
              placeholder="Charges"
              name=""
              // value={items?.charges}
              // onChange={(e) =>
              //   handlerEffect(
              //     e.target.value,
              //     items.consultantId,
              //     "charges"
              //   )
              // }
              id=""
            />
          </p>
          <p>
            <input
              type="checkbox"
              // checked={items?.status}
              // name=""
              // id=""
              // onChange={(e) =>
              //   handlerEffect(
              //     e.target.checked,
              //     items?.consultantId,
              //     "status"
              //   )
              // }
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default DSCharges;
