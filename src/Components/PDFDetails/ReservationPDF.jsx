import React from "react";
import {
  Text,
  Page,
  Document,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import logo from "../../Images/ZMCLogo-2.png";

const DepositPDF = ({
  billData,

  userName,
}) => {
  console.log("BillData", billData);
  const MyPage = ({ children }) => (
    <Page style={styles.page}>
      <Image src={logo} style={styles.Image} />
      <View style={styles.content}>{children}</View>
      <View style={styles.footer} />
      <View style={styles.pageNumber}>
        <Text>Printed User: {userName}</Text>
        <Text
          style={{ textDecoration: "underline" }}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </View>
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>Patient Detail</Text>
        </View>

        <View style={styles.head}>
          {/* Patient Details */}
          <View style={styles.headCNew}>
            <View style={styles.headC2}>
              <Text
                fixed
                style={[styles.font, { fontWeight: "bold" }, styles.wid]}
              >
                Patient Name: {billData?.patientData[0]?.patientType}{" "}
                {billData?.patientData[0]?.patientName}{" "}
                {billData?.patientData[0]?.relativeType}{" "}
                {billData?.patientData[0]?.relativeName}
              </Text>
              <Text fixed style={[styles.font, styles.ml1, styles.wid1]}>
                Gender: {billData?.patientData[0]?.gender}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Contact: {billData?.patientData[0]?.cellNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml2, styles.wid1]}>
                Consultant: {billData?.ConsultantName[0]?.name}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Party: Cash
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Reservation No: {billData?.activeParty[0]?.admissionNo}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.wid]}>
                Mr No: {billData?.activeParty[0]?.mrNo}
              </Text>
              <Text fixed style={[styles.font, styles.ml3, styles.wid1]}>
                Reservation User: {billData?.admissionData[0]?.createdUser}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml4, styles.wid]}>
                Address: {billData?.patientData[0]?.address}
              </Text>
              <Text fixed style={[styles.font, styles.wid1]}>
                Reservation Date: {billData?.admissionData[0]?.createdOn}
              </Text>
            </View>
            <View style={styles.headC2}>
              <Text fixed style={[styles.font, styles.ml5, styles.wid]}>
                Age:{" "}
                {billData?.patientData[0]?.ageYear
                  ? billData?.patientData[0]?.ageYear
                  : "0"}{" "}
                Years{" "}
                {billData?.patientData[0]?.ageMonth
                  ? billData?.patientData[0]?.ageMonth
                  : "0"}{" "}
                Months{" "}
                {billData?.patientData[0]?.ageDay
                  ? billData?.patientData[0]?.ageDay
                  : "0"}{" "}
                Days
              </Text>

              <Text fixed style={[styles.font, styles.wid1]}>
                Remarks: {billData?.admissionData[0]?.remarks}
              </Text>
            </View>
          </View>
        </View>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  Image: {
    height: "50",
    marginTop: "3",
    width: "300",
  },
  pageNumber: {
    left: 0,
    right: 0,
    bottom: 10,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    fontSize: "10",
  },
  footer: {
    left: 8,
    right: 0,
    bottom: 30,
    position: "absolute",
    width: "100%",
    height: "2",
    backgroundColor: "black",
  },
  head: {
    border: "1px solid black",
    marginTop: "2",
    padding: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: "2",
    marginTop: "4",
  },
  headC2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3",
    marginTop: "3",
    textAlign: "left",
  },
  headCNew: {
    marginVertical: "2",
  },
  font: {
    fontSize: 10,
  },

  depHead: {
    border: "1px solid black",
    padding: "2",
    textAlign: "center",
    marginTop: "5",
    color: "white",
    backgroundColor: "#454545",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#454545",
    color: "white",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  test: {
    width: "30%",
    textAlign: "center",
  },
  test2: {
    width: "10%",
    textAlign: "center",
  },
  testHeading: {
    fontSize: "15",
    textDecoration: "underline",
    fontWeight: "bold",
    marginVertical: "4",
    paddingLeft: "3",
  },
  tableData: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5",
    padding: "4",
    fontSize: "12",
    alignItems: "center",
  },
  wid: {
    width: "60%",
  },
  wid1: {
    width: "40%",
  },
});

export default DepositPDF;
