import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import moment from "moment/moment";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SpecimenModal from "../../../Components/Modal/SpecimenModal";
import ModalledInput from "../../../Components/ModalledInput/ModalledInput";
import { useAsyncError } from "react-router-dom";
import SimpleInput from "../../../Components/SimpleInput/SimpleInput";

const Microbiology = () => {
  const [labNo, setLabNo] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [labResultData, setLabResultData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [open, setOpen] = useState(false);
  const [testName, setTestName] = useState("");
  const [activeTest, setActiveTest] = useState(null);
  const [specimen, setSpecimen] = useState(null);
  const [znStain, setZnStain] = useState(null);
  const [microscopy, setMicroscopy] = useState([{}]);
  const [culture, setCulture] = useState([{}]);
  const [gramStain, setGramStain] = useState([{}]);
  const [microscopyData, setMicroscopyData] = useState([]);
  const [organism, setOrganism] = useState([
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
  ]);

  const url = useSelector((items) => items?.url);

  const resetDetails = () => {
    setLabNo("");
    setPatientData([]);
    setLabResultData([]);
    setLabData([]);
    setTestName("");
    setActiveTest(null);
    setSpecimen(null);
    setZnStain(null);
    setMicroscopy([{}]);
    setCulture([{}]);
    setGramStain([{}]);
    setMicroscopyData([]);
    setOrganism([
      { organism: "" },
      { organism: "" },
      { organism: "" },
      { organism: "" },
      { organism: "" },
      { organism: "" },
    ]);
  };

  //getDetail
  const getDetail1 = async (labNumber) => {
    try {
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNumber}&department=Microbiology`,
        {
          withCredentials: true,
        }
      );
      console.log("response of getDetails", response?.data?.data);

      setPatientData(response?.data?.data.patientData);
      setLabData(response?.data?.data.labCDetails);
      setLabResultData(response?.data?.data.labData);
      setLabNo("");
      setOpen(false);
    } catch (error) {
      console.log("error of get details", error);
      setOpen(false);
      resetDetails();
    }
  };

  // get Details api
  const getDetails = async (e, value) => {
    try {
      if (!value) {
        e.preventDefault();
      }
      if (!labNo) {
        throw new Error("PLEASE ENTER LAB NO.");
      }
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNo}&department=Microbiology`,
        {
          withCredentials: true,
        }
      );
      console.log("response of getDetails", response?.data?.data);

      setPatientData(response?.data?.data.patientData);
      setLabData(response?.data?.data.labCDetails);
      setLabResultData(response?.data?.data.labData);
      setLabNo("");
      setOpen(false);
    } catch (error) {
      console.log("error of get details", error);
      let mylab = labNo;
      setOpen(false);
      resetDetails();
      if (error.response) {
        if (error.response.status === 402) {
          ErrorAlert({
            text: "NO DATA FOUND AGAINST THIS LAB NO.",
            timer: 2000,
          });
          return;
        } else if (error.response.status === 403) {
          ErrorAlert({ text: "ALL TESTS ARE DELETED !!!", timer: 2000 });
          return;
        } else if (error.response.status === 401) {
          ErrorAlert({
            text: `ALL RESULT ENTERED ALREADY AGAINST LAB NO ${mylab}!!!`,
            timer: 2000,
          });
          return;
        } else if (error.response.status === 400) {
          ErrorAlert({
            text: `NO TEST FOR MICROBIOLOGY AGAINST LAB NO ${mylab}!!!`,
            timer: 2000,
          });
          return;
        }
        return;
      }

      ErrorAlert({
        text: error.message,
        timer: 2000,
      });
    }
  };

  // const Submit Result
  const submitResult = async (e) => {
    try {
      if (activeTest === null) {
        ErrorAlert({ text: "SELECT TEST FIRST", timer: 2000 });
        return;
      }
      setOpen(true);
      const response = await axios.post(
        `${url}/lab/labResultMicroscopy`,
        {
          mrNo: labData[0]?.mrNo,
          labNo: labData[0]?.labNo,
          resultDepart: labResultData[0]?.department,
          testName: (activeTest?.testName && activeTest?.testName) || "",
          testId: (activeTest?._id && activeTest?._id) || "",
          specimen: specimen?.specimen,
          znStain: specimen?.specimen,
          microscopy,
          culture,
          gramStain,
          microscopyData,
          organism,
        },
        { withCredentials: true }
      );
      console.log("response of submit result ", response);
      setOpen(false);
      await getDetail1(labData[0]?.labNo);
      setTestName("");
      SuccessAlert({ text: "RESULT ENTERED SUCCESSFULLY !!!", timer: 2000 });
      resetDetails();
      getDetails("_", "skipEvent");
    } catch (error) {
      console.log("Error of submit result ", error);
      setOpen(false);
    }
  };

  // getAllMicroscopyData

  const getAllMicroscopyData = () => {
    const response = new Promise((resolve, reject) => {
      let Data = axios.get(`${url}/lab/allDataWithChild`, {
        withCredentials: true,
      });

      if (Data) {
        return resolve(Data);
      } else {
        return reject(Data);
      }
    });

    response
      .then((value) => {
        let updatedData = value?.data?.data?.data?.map((items) => ({
          ...items,
          showChild: false,
        }));
        setMicroscopyData(updatedData);
        console.log(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update specimen
  const updateSpec = (value, key) => {
    if (key === "Specimen") {
      setSpecimen((prevState) => ({
        ...prevState,
        specimen: value, // Update the specimen key
      }));
      console.log(specimen);
      console.log("specimen", specimen);
      return;
    } else if (key === "ZNStain") {
      setZnStain((prevData) => ({
        ...prevData,
        specimen: value,
      }));
      console.log("znstain", znStain);
      return;
    }
  };

  // AddNewLine
  const addAndRemove = (value, index, key) => {
    if (key === "microscopy") {
      if (value === "Add") {
        setMicroscopy((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (microscopy.length === 1) return;
        const removeLine = microscopy.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setMicroscopy(removeLine);
      }
      return;
    } else if (key === "culture") {
      if (value === "Add") {
        setCulture((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (culture.length === 1) return;
        const removeLine = culture.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setCulture(removeLine);
      }
      return;
    } else if (key === "GramStain") {
      if (value === "Add") {
        setGramStain((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (gramStain.length === 1) return;
        const removeLine = gramStain.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setGramStain(removeLine);
      }
      return;
    }
  };

  const updateMicroscopy = (data, index, key, mainKey) => {
    let response;
    if (mainKey === "microscopy") {
      if (key === "microscopy") {
        response = microscopy.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              microscopy: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setMicroscopy(response);
        return;
      } else {
        response = microscopy.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setMicroscopy(response);
        console.log("Response ", response);
        return;
      }
    } else if (mainKey === "culture") {
      console.log("data ", data);

      if (key === "culture") {
        response = culture.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              culture: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setCulture(response);
        return;
      } else {
        response = culture.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setCulture(response);
        console.log("Response ", response);
        return;
      }
    } else if (mainKey === "GramStain") {
      if (key === "GramStain") {
        response = gramStain.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              gramStain: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setGramStain(response);
        return;
      } else {
        response = gramStain.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setGramStain(response);
        console.log("Response ", response);
        return;
      }
    }
  };

  const updateOrg = (data, index) => {
    let newData = organism?.map((items, indexOfOrg) => {
      if (index === indexOfOrg) {
        return { ...items, organism: data?.specimen ? data?.specimen : data };
      }
      return items;
    });
    setOrganism(newData);
  };

  const updateGettedArr = (id) => {
    const newArr = microscopyData.map((items) => {
      if (items._id === id) {
        return {
          ...items,
          showChild: items?.showChild === true ? false : true,
          childData: items?.childData.map((nestedData) => {
            return {
              ...nestedData,
              value1: "",
              value2: "",
              value3: "",
            };
          }),
        };
      }
      return items;
    });
    console.log("new Arr ", newArr);

    setMicroscopyData(newArr);
  };

  const updateValue = (_id, value, key) => {
    const newData = microscopyData?.map((items) => {
      let summary = items?.childData?.map((nestItem) => {
        if (nestItem?._id === _id) {
          return { ...nestItem, [key]: value };
        }
        return nestItem;
      });
      return { ...items, childData: summary };
    });

    console.log(newData);
    setMicroscopyData(newData);
  };

  return (
    <div>
      <CenterHeading title={"DEPARTMENT OF MICROBIOLOGY"} />

      {/* Patient Detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Detail"} />
        <form
          className="flex justify-center my-2"
          onSubmit={(e) => getDetails(e)}
        >
          <LabeledInput
            label={"Lab No"}
            placeholder={"Enter Lab No and press ENTER"}
            onChange={(e) => setLabNo(e.target.value)}
            value={labNo}
          />
        </form>
        <div className="flex flex-col items-center space-y-2">
          <LabeledInput
            label={"Patient Name"}
            placeholder={"Lab No"}
            disabled
            value={
              patientData.length > 0
                ? `${patientData[0].patientType} ${patientData[0].patientName}  ${patientData[0].relativeType} ${patientData[0].relativeName}`
                : ""
            }
          />
          <LabeledInput
            label={"Phone No."}
            placeholder={"Phone No"}
            disabled
            value={(patientData.length > 0 && patientData[0].cellNo) || ""}
          />
          <LabeledInput
            label={"Lab No"}
            placeholder={"Lab No"}
            disabled
            value={(labData.length > 0 && labData[0].labNo) || ""}
          />
          <LabeledInput
            label={"Mr No"}
            placeholder={"Mr No"}
            disabled
            value={(patientData.length > 0 && patientData[0].MrNo) || ""}
          />
          <LabeledInput
            label={"Booking Date"}
            placeholder={"Booking Date"}
            disabled
            value={(labData.length > 0 && labData[0].createdOn) || ""}
          />
          <LabeledInput
            label={"Gender"}
            placeholder={"Gender"}
            disabled
            value={patientData?.length > 0 ? patientData[0]?.gender : ""}
          />
          <LabeledInput
            label={"Age"}
            placeholder={"Age"}
            disabled
            value={
              patientData.length > 0
                ? `${
                    patientData[0]?.ageYear ? patientData[0]?.ageYear : "0"
                  } Years ${
                    patientData[0]?.ageMonth ? patientData[0]?.ageMonth : "0"
                  } Months ${
                    patientData[0]?.ageDay ? patientData[0]?.ageDay : "0"
                  } Days`
                : ""
            }
          />
        </div>
      </div>

      {/* test detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Detail"} />
        <div className="flex flex-col items-center space-y-2 mt-3 ">
          {labResultData.map((items, index) => (
            <div
              key={index}
              onClick={() => setActiveTest(items)}
              className="hover:font-bold hover:text-blue-600 cursor-pointer"
            >
              <LabeledInput
                label={"Test Name"}
                value={`${items?.testName} ${items?.thisIs}`}
                disabled
              />
            </div>
          ))}
        </div>
      </div>

      {/* test entry */}
      {activeTest !== null && (
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={`Test Entry For ${activeTest?.testName}`} />
        </div>
      )}
      {/* test entry */}
      <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Entry"} />

        {/* SPECIMEN AND ZNSTAIN */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <div className="flex justify-center space-x-2 mt-3">
            <SpecimenModal
              title={"SPECIMEN"}
              onClick={(data) => setSpecimen(data)}
              type={"Specimen"}
            />
            <SpecimenModal
              title={"ZN STAIN"}
              onClick={(data) => setZnStain(data)}
              type={"ZNStain"}
            />
          </div>
          <div className="flex justify-around bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <LabeledInput
              label={"Specimen"}
              value={(specimen && specimen?.specimen) || ""}
              onChange={(e) =>
                updateSpec(e.target.value.toUpperCase(), "Specimen")
              }
            />
            <LabeledInput
              label={"ZNStain"}
              onChange={(e) =>
                updateSpec(e.target.value.toUpperCase(), "ZNStain")
              }
              value={(znStain && znStain?.specimen) || ""}
            />
          </div>
        </div>
        {/* MICROSCOPY */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"MICROSCOPY"} />

          {microscopy.length > 0 &&
            microscopy.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"Microscopy"}
                  onClickAdd={() => addAndRemove("Add", index, "microscopy")}
                  onClickLess={() => addAndRemove("Less", index, "microscopy")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "microscopy", "microscopy")
                  }
                  modalName={"Microscopy"}
                  TextAreaValue={(items?.microscopy && items?.microscopy) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "microscopy",
                      "microscopy"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "microscopy"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Culture */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"CULTURE"} />

          {culture.length > 0 &&
            culture.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"Culture"}
                  placeholder="Culture"
                  onClickAdd={() => addAndRemove("Add", index, "culture")}
                  onClickLess={() => addAndRemove("Less", index, "culture")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "culture", "culture")
                  }
                  modalName={"Culture"}
                  TextAreaValue={(items?.culture && items?.culture) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "culture",
                      "culture"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "culture"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Gram Stain */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"GRAM STAIN"} />

          {gramStain.length > 0 &&
            gramStain.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"GramStain"}
                  placeholder="GramStain"
                  onClickAdd={() => addAndRemove("Add", index, "GramStain")}
                  onClickLess={() => addAndRemove("Less", index, "GramStain")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "GramStain", "GramStain")
                  }
                  modalName={"Gram Stain"}
                  TextAreaValue={(items?.gramStain && items?.gramStain) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "GramStain",
                      "GramStain"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "GramStain"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Organism */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"ORGANISM"} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {organism.map((items, index) => (
              <ModalledInput
                type={"Organism"}
                inputShow={false}
                modalName={"Select"}
                placeholder={`Organism ${index + 1}`}
                TextAreaValue={items?.organism}
                onChangeTextArea={(event) => {
                  updateOrg(event.target.value, index);
                }}
                onClickModal={(data) => {
                  updateOrg(data, index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Microscopy Data */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl h-80 overflow-auto">
          <CenterHeading title={"MICROSCOPY DATA"} />
          <div className="flex justify-center my-4">
            <ButtonDis title={"Load Data 🔃"} onClick={getAllMicroscopyData} />
          </div>
          {microscopyData.length > 0 &&
            microscopyData.map((items, index) => (
              <div key={index} className="mt-2 flex justify-center">
                <div className="flex flex-col items-center">
                  <ButtonDis
                    title={`${items?.parentName}`}
                    style={"bg-blue-600"}
                    onClick={() => updateGettedArr(items?._id)}
                  />
                  {items?.childData.length > 0 &&
                    items?.showChild === true &&
                    items?.childData.map(
                      (itemOfShowChild, indexOfShowChild) => (
                        <div
                          key={indexOfShowChild}
                          className="grid grid-cols-4 gap-x-3 mt-2"
                        >
                          <p>{itemOfShowChild?.name}</p>
                          <SimpleInput
                            placeholder={"value 1"}
                            onChange={(e) =>
                              updateValue(
                                itemOfShowChild?._id,
                                e.target.value,
                                "value1"
                              )
                            }
                          />
                          <SimpleInput
                            placeholder={"value 2"}
                            onChange={(e) =>
                              updateValue(
                                itemOfShowChild?._id,
                                e.target.value,
                                "value2"
                              )
                            }
                          />
                          <SimpleInput
                            placeholder={"value 3"}
                            onChange={(e) =>
                              updateValue(
                                itemOfShowChild?._id,
                                e.target.value,
                                "value3"
                              )
                            }
                          />
                        </div>
                      )
                    )}
                </div>
              </div>
            ))}
        </div>

        {/* Header */}
        <div className="flex justify-center space-x-2 mt-5">
          <ButtonDis title={"Save"} onClick={submitResult} />
          <ButtonDis title={"Refresh"} onClick={resetDetails} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default Microbiology;
