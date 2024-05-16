import { Modal, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import e from "cors";
import axios from "axios";

const OrderForm = ({ isOpen, handleClose }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandQuery, setBrandQuery] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const [managerQuery, setManagerQuery] = useState("");
  const [orderData, setOrderData] = useState({
    id: Math.floor(Math.random() * 20000000),
    customer: "",
    vendorBrand: "",
    manager: "",
    jewelleryType: "",
    mainColor: "",
    mainMetal: "",
    mainGem: "",
    assay: null,
    weight: null,
    status: "pending",
    vendorCost: null,
    conclusionDate: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name !== "id" && name !== "status") {
      setOrderData({
        ...orderData,
        [name]: value,
        id: Math.floor(Math.random() * 20000000),
      });
    }
  };
  const handleChangeIds = (ids, name) => {
    setOrderData({
      ...orderData,
      [name]: ids,
    });
  };
  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await fetch("http://localhost:8080/manager/getall");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setManagers(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchManager();
  }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/customer/filter/${customerQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCustomers();
  }, [customerQuery]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`http://localhost:8080/vendor/filter/${brandQuery}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setBrands(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBrands();
  }, [brandQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    console.log(JSON.stringify(orderData));
    console.log("Form submitted:", orderData);
    try {
      await axios.post("http://localhost:8080/order/add", orderData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCustomerChange = (e) => {
    console.log(e.target.value);
    setCustomerQuery(e.target.value);
  };
  const handleManagerChange = (e) => {
    console.log(e.target.value);
    setManagerQuery(e.target.value);
  };
  const handleVendorChange = (e) => {
    console.log(e.target.value);
    setBrandQuery(e.target.value);
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#E0FFFF", borderRadius: 16, padding: 20 }}
      >
        <Typography variant="h6" component="h2" align="center">
          Order Details
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="text"
            name="jewelleryType"
            placeholder="Jewellery Type"
            value={orderData.jewelleryType}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="text"
            name="mainColor"
            placeholder="Main Color"
            value={orderData.mainColor}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="text"
            name="mainMetal"
            placeholder="Main Metal"
            value={orderData.mainMetal}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="text"
            name="mainGem"
            placeholder="Main Gem"
            value={orderData.mainGem}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="text"
            name="assay"
            placeholder="Assay"
            value={orderData.assay}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={orderData.weight}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <input
            type="number"
            name="vendorCost"
            placeholder="Vendor Cost"
            value={orderData.vendorCost}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <div>
            <input
              type="text"
              placeholder="Search manager..."
              value={managerQuery}
              onChange={handleManagerChange}
              style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
            />
            <div
              className="dropdown"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "2px",
                width: "100%",
              }}
            >
              {managers
                .filter(
                  (manager) =>
                    manager.personData.firstName.startsWith(managerQuery) &&
                    manager.personData.firstName + " " + manager.personData.lastName !==
                      managerQuery &&
                    managerQuery !== ""
                )
                .slice(0, 10)
                .map((manager, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        padding: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setManagerQuery(
                          manager.personData.firstName + " " + manager.personData.lastName
                        );
                        handleChangeIds(manager, "manager");
                      }}
                    >
                      {manager.personData.firstName} {manager.personData.lastName}
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search customer..."
              value={customerQuery}
              onChange={handleCustomerChange}
              style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
            />
            <div
              className="dropdown2"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "2px",
                width: "100%",
              }}
            >
              {customers
                .filter(
                  (customer) =>
                    customer.personData.firstName.startsWith(customerQuery) &&
                    customer.personData.firstName + " " + customer.personData.lastName !==
                      customerQuery &&
                    customerQuery !== ""
                )
                .slice(0, 10)
                .map((customer, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        padding: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCustomerQuery(
                          customer.personData.firstName + " " + customer.personData.lastName
                        );
                        handleChangeIds(customer, "customer");
                      }}
                    >
                      {customer.personData.firstName} {customer.personData.lastName}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search vendor..."
              value={brandQuery}
              onChange={handleVendorChange}
              style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
            />
            <div
              className="dropdown3"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                padding: "2px",
                width: "100%",
              }}
            >
              {brands
                .filter(
                  (brand) =>
                    brand.name.startsWith(brandQuery) &&
                    brand.name !== brandQuery &&
                    brandQuery !== ""
                )
                .slice(0, 10)
                .map((brand, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        padding: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setBrandQuery(brand.name);
                        handleChangeIds(brand, "vendorBrand");
                      }}
                    >
                      {brand.name}
                    </div>
                  );
                })}
            </div>
          </div>
          <input
            type="date"
            name="conclusionDate"
            placeholder="Conclusion Date"
            value={orderData.conclusionDate}
            onChange={handleChange}
            required
            style={{ borderRadius: 8, padding: 10, border: "1px solid #aaa", width: "100%" }}
          />
          <button
            type="submit"
            style={{
              borderRadius: 8,
              padding: 10,
              border: "1px solid #aaa",
              backgroundColor: "blue",
              color: "white",
              width: "100%",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

OrderForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const AddOrder = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <MDButton variant="contained" color="info" onClick={handleOpenModal}>
        Add order
      </MDButton>
      <OrderForm isOpen={openModal} handleClose={handleCloseModal}></OrderForm>
    </>
  );
};

export default AddOrder;
