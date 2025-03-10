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
  const [customers, setCustomers] = useState([]);
  const [address, setAddress] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    
  });
  const [oilSelections, setOilSelections] = useState([{ id: Date.now(), type: "", quantity: "" }]);
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

        const uniqueCustomers =  json.map((customer, index) => ({
          label: customer.name,
          key: index+1
        }));
        setCustomers(uniqueCustomers);

        const customerAddresses = json.map((customer, index) => ({
          label: customer.address,
          key: index+1
        }));
        setAddress(customerAddresses);
        
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

  // const createNewOrder = async (orderDetails) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/orders/`, {
  //       method: "POST",
  //       body: {orderDetails}
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete order");
  //     }
  //   }
  //   catch(err){
  //     throw new Error(`error while creating a new order + ${err}`);
  //   }
  // };

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
                    options={customers}
                    sx={{ width: "100%" }}
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
                      renderInput={(params) => <TextField {...params} label="Oil Type" />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Quantity" type="number" fullWidth />
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

            <TextField label="Comments" multiline rows={3} fullWidth sx={{ mb: 2 }} />
            <TextField label="Delivery Address" multiline rows={3} fullWidth sx={{ mb: 2 }} />
            <Button variant="text" fullWidth sx={{ mb: 2 }}>
              Use Customer Address
            </Button>
            <TextField label="Total Cost" fullWidth sx={{ mb: 3 }} />
            <Button variant="contained" color="primary" fullWidth > 
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
