import React from "react";
import Drawer from "../Drawer/Drawer";
import hospitalBed from "../../Images/hospital-bed-png.webp";
const BED = ({ bedNo, admissionNo, patienName, onClick }) => {
  return (
    <div className="border-2 rounded-xl border-black w-40 p-2 my-2">
      <div className="flex justify-between items-center">
        <img src={hospitalBed} alt="" className="w-20 h-20" />
        <Drawer onClick={onClick} />
      </div>
      <p className="text-center text-xs">BED NO. {bedNo}</p>
      <p className="text-center text-xs mt-1">ADM NO. {admissionNo}</p>
      <p className="text-center text-xs mt-1">{patienName}</p>
    </div>
  );
};

export default BED;
