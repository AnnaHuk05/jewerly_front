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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";

import React, { useState, useEffect } from "react";

function BillingInformation() {
  const [billingData, setBillingData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/contract/get10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const rows = [];
        for (let i = 0; i < data.length; i++) {
          const orderData = data[i].order;
          const newRow = {
            bill: (
              <Bill
                name={orderData.id}
                company={orderData.vendorBrand.name}
                email={orderData.vendorCost}
                vat={orderData.conclusionDate}
              />
            ),
          };
          rows.push(newRow);
        }
        setBillingData(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Card id="delete-account" sx={{ width: "900px", maxHeight: "600px", overflow: "auto" }}>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Expences
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {billingData ? (
            billingData.map((bill, index) => (
              <MDBox key={index} component="li" py={1} pr={2} mb={1}>
                {bill.bill}
              </MDBox>
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

export default BillingInformation;
