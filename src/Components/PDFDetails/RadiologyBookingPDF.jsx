import React from "react";
import { Text, Page, Document, StyleSheet, View } from "@react-pdf/renderer";

const RadiologyBookingPDF = ({ mrData }) => {
  const MyPage = ({ children }) => (
    <Page size={[288, "auto"]} style={styles.page}>
      <View style={styles.logoContainer}>
        <Text>Your Company Logo</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </Page>
  );

  return (
    <Document>
      <MyPage>
        <View style={styles.headC1}>
          <Text>Patient Detail</Text>
        </View>

        <View style={styles.head}>
          <Text style={styles.text}>
            Patient Name: Muhammad hamza s/o farooq
          </Text>
          <Text style={styles.text}>Gender: Male</Text>
          <Text style={styles.text}>Age: 10 Years</Text>
          <Text style={styles.text}>Cell No: 03111011484</Text>
          <Text style={styles.text}>MR No: 10</Text>
          <Text style={styles.text}>Radiology No: 12</Text>
          <Text style={styles.text}>Performed By: Dr. Hamza Ali</Text>
          <Text style={styles.text}>Payment Type: Cash</Text>
          <Text style={styles.text}>Payment Location: Main Reception</Text>
          <Text style={styles.text}>
            Remarks: outsourse patient of dr khalid and dr fiasal and me
          </Text>
          <Text style={styles.text}>Created User: hamza.farooq</Text>
          <Text style={styles.text}>CreatedOn: 20/07/2024 15:13:50</Text>
        </View>

        <View style={styles.headC1}>
          <Text>Test Detail</Text>
        </View>
        <View style={styles.detailshead}>
          <Text style={{ fontSize: "9", width: "40%", textAlign: "left" }}>
            Test Name
          </Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Charges</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Amount</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4",
            border: "1px solid black",
            padding: "2",
            borderBottom: "1 px solid black",
          }}
        >
          <Text style={{ fontSize: "9", width: "40%" }}>Chest x-ray</Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            2000 x 1
          </Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            2000
          </Text>
        </View>
        <View style={styles.headC1}>
          <Text>Payment Detail</Text>
        </View>
        <View style={styles.detailshead}>
          <Text style={{ fontSize: "9", width: "40%" }}>Payment No</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Total Amount</Text>
          <Text style={{ fontSize: "9", width: "30%" }}>Amount Received</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4",
            border: "1px solid black",
            padding: "2",
            borderBottom: "1 px solid black",
          }}
        >
          <Text style={{ fontSize: "9", width: "40%", textAlign: "center" }}>
            00310
          </Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            2000
          </Text>
          <Text style={{ fontSize: "9", width: "30%", textAlign: "center" }}>
            2000
          </Text>
        </View>

        <View
          style={{
            height: "2",
            width: "100%",
            marginTop: "10",
            border: "1px solid black",
          }}
        />
        <Text style={{ marginTop: "5", textAlign: "center", fontSize: "15" }}>
          GET WELL SOON 🤞
        </Text>
      </MyPage>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: 288, // 4 inches in points
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  content: {
    flexGrow: 1,
  },
  head: {
    border: "1px solid black",
    padding: 2,
    display: "flex",
    paddingVertical: 4,
    marginTop: "2",
  },
  headC1: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
  },
  detailshead: {
    border: "1px solid black",
    color: "white",
    backgroundColor: "#454545",
    textAlign: "center",
    padding: 2,
    marginTop: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4",
  },
  text: {
    fontSize: 11,
    marginTop: "2",
    width: "100%",
    overflow: "hidden",
  },
});

export default RadiologyBookingPDF;
