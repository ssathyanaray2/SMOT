import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  Typography,
  Button,
  IconButton,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { Switch, FormControlLabel } from "@mui/material";

// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import oilBottle from "./oil_bottle.glb";


// function OilBottle() {
//   const { scene } = useGLTF(oilBottle); // Load from public folder
//   return <primitive object={scene} scale={2} rotation={[0.4, 0.2, 0]} />;
// }

export default function OrderForm(props) {
  const { value, index } = props;
  const [options, setOptions] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [isPaid, setIsPaid] = useState(false);
  const [oilSelections, setOilSelections] = useState([{ type: "", quantity: "" }]);
  const navigate = useNavigate();

  useEffect( () => {
    const fetchProductOptions = ( async () => {
      
      try{
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const op = json.map((product) => product.oilType);
        setOptions(op);
      }
      catch(err) {
        throw new Error(`HTTP error! status: ${err}`);
      }
    })
    fetchProductOptions();
  }, []);


  useEffect( () => {
    const fetchCustomers = ( async () => {
      
      try{
        const response = await fetch("http://localhost:8080/api/customers?limit=6");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        setCustomerDetails(json);
        
      }
      catch(err) {
        throw new Error(`HTTP error! status: ${err}`);
      }
    })
    fetchCustomers();
  }, []);

  const addOil = () => {
    setOilSelections([...oilSelections, { id: Date.now(), type: "", quantity: "" }]);
  };

  const removeOil = (id) => {
    setOilSelections(oilSelections.filter((oil) => oil.id !== id));
  };


  const handleOilTypeChange = (index, newValue) => {
    const updatedSelections = [...oilSelections];
    updatedSelections[index].type = newValue;
    setOilSelections(updatedSelections);
  };

  const handleQuantityChange = (index, event) => {
    const updatedSelections = [...oilSelections];
    updatedSelections[index].quantity = event.target.value;
    setOilSelections(updatedSelections);
  };


  const handleAddAddress = async (customerAddress) => {
    if (!customer) {
      console.error("No customer selected");
      return;
    }
    const element = document.querySelector("#address");

    if (element) {
      element.value = customerAddress; 
    } else {
      console.error("Delivery Address input not found");
    }

  };

  const createNewOrder = async () => {
    try {
      setOrderDetails((orderD) => ({
        ... orderD,
        order: oilSelections
      }));

      console.log(orderDetails);
      const response = await fetch(`http://localhost:8080/api/orders/`, {
        method: "POST",
        body: {orderDetails}
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
    }
    catch(err){
      throw new Error(`error while creating a new order + ${err}`);
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tab-${index}`}
    >
    <Grid
      container
      spacing={4}
      sx={{ height: "100vh", padding: 4 }}
    >
      <Grid item xs={5}>
        {value === index && (
          <Paper
            elevation={15}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              width: "100%",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order Form
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Customer
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <Autocomplete
                    options={customerDetails}
                    sx={{ width: "100%" }}
                    getOptionLabel={(option) => option.name}
                    getOptionKey={(option) => option._id}
                    onChange={(event, selectedCustomer) => {
                      setCustomer(selectedCustomer);
                      setOrderDetails((order) => ({
                        ...order,
                        customerId: selectedCustomer._id,
                        deliveryAdress: selectedCustomer.address,
                      }));
                      handleAddAddress(selectedCustomer.address);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Customer" />}
                  />
                </Grid>
                <Grid item>
                  <Button variant="outlined" fullWidth sx={{ height: "100%" }} onClick={() => navigate("/customer")} >
                      + New Customer
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Oil Selection
              </Typography>
              {oilSelections.map((oil) => (
                <Grid key={oil.id} container spacing={2} alignItems="center" sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Autocomplete
                      options={options}
                      sx={{ width: "100%" }}
                      onChange={(event, newValue) => handleOilTypeChange(index, newValue)}
                      renderInput={(params) => <TextField {...params} label="Oil Type" />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Quantity" type="number" fullWidth 
                    onChange={(event) => handleQuantityChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    {oilSelections.length > 1 && (
                      <IconButton onClick={() => removeOil(oil.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                fullWidth
                sx={{ mt: 1 }}
                onClick={addOil}
              >
                Add Another Oil
              </Button>
            </Box>
            

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Comments
              </Typography>
              <TextField  multiline rows={3} fullWidth sx={{ mb: 2 }} onChange={(e) => {
                setOrderDetails((order) => ({
                  ...order,
                  comments: e.target.value, 
                }));
              }}/>
            </Box>

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Delivery Address
              </Typography>
              <TextField id="address" multiline rows={3} fullWidth sx={{ mb: 2 }} onChange={(e) => {
                setOrderDetails((order) => ({
                  ...order,
                  deliveryAdress: e.target.value, 
                })
              );
              }}/>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Total Cost
              </Typography>
              <TextField label="Total Cost" fullWidth sx={{ mb: 3 }} />
            </Box>

            <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Payment Status
              </Typography>
              <FormControlLabel
                sx={{ ml: 2 }} 
                control={<Switch checked={isPaid} onChange={(event) => {
                  setIsPaid(event.target.checked);
                  setOrderDetails((order) => ({
                    ...order,
                    status: isPaid ? "Pending" : "Completed"
                  })
                );

                }} color="success" />}
                label={isPaid ? "Completed" : "Pending"}
              />
            </Box>

            <Button variant="contained" color="primary" fullWidth onClick={createNewOrder}> 
              Submit Order
            </Button>

          </Paper>
        )}
      </Grid>

      <Grid item xs={7}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Canvas camera={{ position: [2, 2, 4] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} intensity={1} />
            <OilBottle />
            <OrbitControls 
                autoRotate
                autoRotateSpeed={2} 
                enableZoom={false} // Disables zooming
                enablePan={false} // Prevents dragging
            />
          </Canvas> */}
        </Box>
      </Grid>
    </Grid>
    </div>
  );
}

OrderForm.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
