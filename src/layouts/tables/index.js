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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Select, TextField } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

// Data
import authorsTableData from "layouts/tables/data/managerTableData";
import projectsTableData from "layouts/tables/data/ordersTableData";
import SearchBar from "components/SearchBar/SearchBar";
import DatePicker from "react-datepicker";
import { FormControlLabel, Checkbox, Radio, RadioGroup } from "@mui/material";
import AddOrder from "./AddForm";
import { useEffect } from "react";

import { useState } from "react";
import MDButton from "components/MDButton";
function Tables() {
  const [orderData, setOrderData] = useState(null);
  const { columns, rows } = authorsTableData();
  const [selectedValue, setSelectedValue] = useState("id"); // Стан для зберігання обраного значення
  const [searchTerm, setSearchTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { columns: pColumns, rows: pRows } = projectsTableData(orderData);
  const [selectedDate, setSelectedDate] = useState(null);
  const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
  const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchType, setSearchType] = useState("manager");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date("2022-03-03"),
    endDate: new Date(),
    key: "selection",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/contract/get10");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/contract/getBetweenDates/${selectedDateRange.startDate
            .toISOString()
            .slice(0, 10)}/${selectedDateRange.endDate.toISOString().slice(0, 10)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedDateRange]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value); // Функція, яка оновлює обране значення при зміні вибору
  };
  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };
  const handleProcessData = () => {
    // Process the selected date range here
    setShowCalendar(!showCalendar);
    console.log("Selected dates:", selectedDateRange);
  };
  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [useDate, setUseDate] = useState(false);

  const handleUseDateChange = (event) => {
    setUseDate(event.target.checked);
  };
  const handleDateSelect = (ranges) => {
    setSelectedDateRange(ranges.selection); // Ховаємо календар після вибору дати
  };
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={4}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Orders Table
                </MDTypography>
              </MDBox>
              <MDBox
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                mx={2}
                mt={-3}
              >
                <MDBox display="flex" flexDirection="column" px={4}>
                  {" "}
                  <br />
                  {/* Changed to column for vertical menu */}
                  <MDTypography variant="h6" color="text"></MDTypography>
                  <MDBox display="flex" flexDirection="column" mb={4}>
                    {" "}
                    {/* Nested container for options */}
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                      <Grid item>
                        <div>
                          <p>Start Date: {formatDate(selectedDateRange.startDate)}</p>
                          <p>End Date: {formatDate(selectedDateRange.endDate)}</p>
                        </div>
                        <br></br>
                        <MDButton variant="contained" color="info" onClick={handleCalendarToggle}>
                          Choose Date Range
                        </MDButton>
                        {showCalendar && (
                          <DateRangePicker
                            editableDateInputs={false}
                            onChange={handleDateSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={[selectedDateRange]}
                            showMonthAndYearPickers={true} // Відображення вибору року і місяця
                            direction="horizontal"
                            months={1}
                            staticRanges={[]} // Приховуємо попередньо визначені діапазони дат
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid item>
                      <br></br>
                      <MDButton variant="contained" color="info" onClick={handleProcessData}>
                        Process Data
                      </MDButton>
                    </Grid>
                  </MDBox>
                  <MDBox>
                    <MDBox>
                      <AddOrder />
                    </MDBox>
                  </MDBox>
                </MDBox>

                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default Tables;
