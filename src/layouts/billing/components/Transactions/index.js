/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { da } from "date-fns/locale";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import React, { useState, useEffect } from "react";

function Transactions() {
  const [payments, setPayments] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/pay/getlatest");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const rows = [];
        for (let i = 0; i < data.length; i++) {
          let purpose = "";
          let purposeId = "";
          let iconname = "";
          let name = "";
          if (data[i].consultation !== null) {
            purpose = "Consultation";
            purposeId = data[i].consultation.id;
            iconname = "peopleAltIcon";
            name =
              data[i].consultation.customerId.personData.firstName +
              " " +
              data[i].consultation.customerId.personData.lastName;
          } else {
            purpose = "Contract";
            purposeId = data[i].contract.id;
            iconname = "assignmentIcon";
            name =
              data[i].contract.order.customer.personData.firstName +
              " " +
              data[i].contract.order.customer.personData.lastName;
          }
          const newRow = {
            bill: (
              <Transaction
                color="success"
                icon={iconname}
                name={name}
                description={purpose + "\n" + purposeId}
                value={"+" + data[i].amount}
              />
            ),
            date: data[i].paymentDate,
          };
          rows.push(newRow);
        }
        setPayments(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ maxHeight: "600px", overflow: "auto" }}>
      <MDBox pt={3} pb={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Incomes
        </MDTypography>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {payments ? (
            Object.entries(
              payments.reduce((acc, bill) => {
                const date = bill.date; // replace 'date' with the actual property name for the date
                if (!acc[date]) {
                  acc[date] = [];
                }
                acc[date].push(bill);
                return acc;
              }, {})
            ).map(([date, bills], index) => (
              <div key={index}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={3}
                  px={2}
                >
                  <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    {date.slice(0, 10)}
                  </MDTypography>
                </MDBox>
                {bills.map((bill, index) => (
                  <MDBox key={index} component="li" py={1} pr={2} mb={1}>
                    <MDTypography variant="body1">{bill.bill}</MDTypography>
                  </MDBox>
                ))}
              </div>
            ))
          ) : (
            <MDBox py={2} px={2}>
              <MDTypography variant="body2" color="text" textAlign="center">
                Loading...
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
