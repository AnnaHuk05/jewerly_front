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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import BillingInformation from "./components/BillingInformation";
import Transactions from "./components/Transactions";
import { useEffect } from "react";
import { random } from "chroma-js";

function Billing() {
  const [formState, setFormState] = useState({
    id: Math.floor(Math.random() * 20000000),
    consultation: null,
    contract: null,
    amount: "",
    paymentDate: "",
  });
  const [paymentType, setPaymentType] = useState("contract");
  const [brandQuery, setBrandQuery] = useState("");
  const [payments, setPayments] = useState(null);
  const [payLeft, setPayLeft] = useState(0);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/${paymentType}/getStartWith/${brandQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setPayments(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBrands();
  }, [brandQuery]);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeSelect = (event) => {
    setPaymentType(event.target.value);
  };
  const handleChangeIds = (ids, name) => {
    setFormState({
      ...formState,
      [name]: ids,
      id: random(1000009, 9999999),
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    console.log("Form submitted:", formState);
    try {
      await axios.post("http://localhost:8080/pay/add", formState);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleQueryChange = (e) => {
    console.log(e.target.value);
    setBrandQuery(e.target.value);
  };
  // Here you can handle the form submission, e.g. send the data to your server

  return (
    <DashboardLayout>
      <MDBox py={3}>
        <form
          onSubmit={handleSubmit}
          style={{ padding: "10px", backgroundColor: "white", borderRadius: "10px" }}
        >
          <Typography variant="h4" gutterBottom>
            Register Payment
          </Typography>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={paymentType}
                  onChange={handleChangeSelect}
                  style={{ width: "100%", height: "45px" }}
                >
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="consultation">Consultation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} mb={2}>
              <TextField
                name="id"
                value={brandQuery}
                onChange={handleQueryChange}
                label="ID"
                fullWidth
                style={{ height: "40%" }}
              />
              <div
                className="dropdown4"
                style={{
                  maxHeight: "100px",
                  overflowY: "auto",
                  padding: "2px",
                  width: "100%",
                }}
              >
                {payments &&
                  payments
                    .filter((brand) => brand.id !== brandQuery && brandQuery !== "")
                    .slice(0, 10)
                    .map((brand, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setBrandQuery(brand.id);
                            if (paymentType === "contract") {
                              handleChangeIds(brand, "contract");
                              setPayLeft(brand.amount - brand.amountPaid);
                            } else {
                              handleChangeIds(brand, "consultation");
                              setPayLeft(brand.cost);
                            }
                          }}
                        >
                          {brand.id}
                        </div>
                      );
                    })}
              </div>
            </Grid>
          </Grid>
          <Box mb={2}>
            <TextField
              name="amount"
              value={formState.amount}
              onChange={handleChange}
              label="Amount"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="date"
              name="paymentDate"
              value={formState.paymentDate}
              onChange={handleChange}
              label="Payment Date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box display="flex" alignItems="space-between">
            <MDButton variant="gradient" color="dark" type="submit" sx={{ marginRight: "40px" }}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              Register
            </MDButton>
            <Typography>{"Pay left:  " + payLeft}</Typography>
          </Box>
        </form>
        <br></br>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
