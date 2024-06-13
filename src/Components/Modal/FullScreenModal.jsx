import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SimpleInput from "../SimpleInput/SimpleInput";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "21px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

export default function BasicModal({ onClick, title }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    setData([
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0632",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "06338",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza khan",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "0633",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
      {
        mrNo: "06337",
        name: "hamza",
        contact: "03111011484",
        cnic: 4210112846685,
      },
    ]);
  }, [toggle]);
  const handleClose = () => setOpen(false);

  const OpenData = () => {
    setToggle(!toggle);
    setOpen(!open);
  };

  const filterNames = (input) => {
    const searchTerm = input.toLowerCase();
    if (input === "") {
      setToggle(!toggle);
      return;
    }

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    setData(filteredData);
  };

  const SendData = (item) => {
    onClick(item);
    handleClose();
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div>
      <Button onClick={OpenData}>{title}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <SimpleInput
              ref={inputRef}
              placeholder={"Input Patient Data"}
              onChange={(e) => filterNames(e.target.value)}
            />
          </div>
          <div className="container mx-auto mt-3">
            <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
              <p className="">MR No.</p>
              <p className="">Patient Name</p>
              <p className="">Phone No</p>
              <p className="">Cnic No</p>
            </div>
          </div>

          <div className="max-h-96">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  className="container mx-auto mt-3"
                  key={index}
                  onClick={() => SendData(item)}
                >
                  <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                    <p className="">{item.mrNo}</p>
                    <p className="">{item.name}</p>
                    <p className="">{item.contact}</p>
                    <p className="">{item.cnic}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center">NO Data Loaded...</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
