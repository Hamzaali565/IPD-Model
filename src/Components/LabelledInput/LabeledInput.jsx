import React from "react";
import SimpleInput from "../SimpleInput/SimpleInput";

const LabeledInput = ({ label, max, placeholder, type, onChange, value }) => {
  return (
    <div className="md:w-80 grid grid-cols-[5rem,auto] md:grid-cols-[10rem,auto] gap-x-2 items-center">
      <p className="text-sm">{label}:</p>
      <SimpleInput
        max={max}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default LabeledInput;
