/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import MyComponent from "../Model";

import React, { useState, useEffect } from "react";

export default function data(data) {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );
  const [orderData, setOrderData] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  //I need handler for the action buuton to open popup with order details abount the order
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(data);
        const rows = [];
        for (let i = 0; i < data.length; i++) {
          const orderData = data[i].order;
          const newRow = {
            project: <Project image={LogoAsana} name={orderData.id} />,
            budget: (
              <MDTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
              >
                ${data[i].amount}
              </MDTypography>
            ),
            paid: (
              <MDTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
              >
                ${data[i].amountPaid}
              </MDTypography>
            ),
            status: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {orderData.status}
              </MDTypography>
            ),
            completion: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {orderData.jewelleryType.replace("jewelry.", "")}
              </MDTypography>
            ),
            jeweller: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {orderData.vendorBrand.name}
              </MDTypography>
            ),
            customer: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {orderData.customer.personData.firstName +
                  " " +
                  orderData.customer.personData.lastName}
              </MDTypography>
            ),
            manager: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {orderData.manager.personData.firstName +
                  " " +
                  orderData.manager.personData.lastName}
              </MDTypography>
            ),

            action: (
              <MDTypography component="a" href="#" color="text">
                <MyComponent data={data[i]}></MyComponent>
              </MDTypography>
            ),
          };
          rows.push(newRow);
        }
        setOrderData(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);
  return {
    columns: [
      { Header: "order", accessor: "order", width: "30%", align: "left" },
      { Header: "amount", accessor: "budget", align: "left" },
      { Header: "paid", accessor: "paid", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "type", accessor: "completion", align: "center" },
      { Header: "jeweller", accessor: "jeweller", align: "center" },
      { Header: "customer", accessor: "customer", align: "center" },
      { Header: "manager", accessor: "manager", align: "center" },
      { Header: "more", accessor: "action", align: "center" },
    ],

    // eslint-disable-next-line prettier/prettier
    rows: orderData
      ? orderData.map((row, index) => ({
          order: row.project,
          budget: row.budget,
          paid: row.paid,
          status: row.status,
          completion: row.completion,
          jeweller: row.jeweller,
          customer: row.customer,
          manager: row.manager,
          action: row.action,
          key: index, // Add a unique key for each row
        }))
      : [],
  };
}
