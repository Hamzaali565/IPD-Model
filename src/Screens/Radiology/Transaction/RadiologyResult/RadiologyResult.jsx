import React, { useState, useEffect } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";

const RadiologyResult = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset error when a new file is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  useEffect(() => {
    return () => {
      // Cleanup the URL object when the component unmounts
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Result"} />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {fileUrl && (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "600px" }}
          title="Document Viewer"
        ></iframe>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default RadiologyResult;
