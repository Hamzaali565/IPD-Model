import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import Loader from "../../../../Components/Modal/Loader";
import RadioTestModal from "../../../../Components/Modal/RadioTestModal";
import { useSelector } from "react-redux";
import axios from "axios";

const TestCancellation = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loader, setLoader] = useState(false);

  const url = useSelector((items) => items?.url);
  const userData = useSelector((items) => items?.response);

  const getDetails = async (data) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${url}/radiologybooking?radiologyNo=${data?.radiologyNo}`,
        { withCredentials: true }
      );
      setServiceDetails(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("Error of get Data", error);
      setLoader(false);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Tests Cancellation"} />
        <div className="flex justify-center mt-2">
          <RadioTestModal title={"Select Radiology No."} onClick={getDetails} />
        </div>
      </div>

      {/* service details */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Service Details"} />
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Service Name</p>
            <p>Charges</p>
            <p>Amount</p>
            <p>Remove</p>
          </div>
        </div>
        {serviceDetails.length > 0 &&
          serviceDetails.map((items) => (
            <div className="container mx-auto mt-3">
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.serviceName} </p>
                <p>{items?.amount}</p>
                <p>{items?.amount}</p>
                <p className="font-bold underline cursor-pointer hover:text-red-600">
                  Delete
                </p>
              </div>
            </div>
          ))}
      </div>
      <Loader title={"Please Wait"} onClick={loader} />
    </div>
  );
};

export default TestCancellation;
