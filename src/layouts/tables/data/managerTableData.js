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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import { Modal, Button, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useState, useEffect } from "react";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ name, phone }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{phone}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const [managerData, setManagerData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/manager/getall");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const rows = [];
        for (let i = 0; i < data.length; i++) {
          const newRow = {
            info: (
              <Author
                name={data[i].personData.firstName + " " + data[i].personData.lastName}
                phone={data[i].personData.phoneNumber}
              />
            ),
            salary: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {data[i].salary}
              </MDTypography>
            ),
            trading: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {data[i].tradingPoint.id}
              </MDTypography>
            ),
            employed: (
              <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                {data[i].hireDate}
              </MDTypography>
            ),
            action: (
              <Button>
                {" "}
                <Icon>more_vert</Icon>
              </Button>
            ),
          };
          rows.push(newRow);
        }
        setManagerData(rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return {
    columns: [
      { Header: "info", accessor: "info", width: "45%", align: "left" },
      { Header: "salary", accessor: "salary", align: "left" },
      { Header: "trading point", accessor: "trading", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "edit", accessor: "edit", align: "center" },
    ],

    rows: managerData
      ? managerData.map((row, index) => ({
          info: row.info,
          salary: row.salary,
          trading: row.trading,
          employed: row.employed,
          edit: row.edit,
        }))
      : [],
  };
}
