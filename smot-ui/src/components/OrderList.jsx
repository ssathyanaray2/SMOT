import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

export default function OrderList(props) {
  const { value, index } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [idVal, setIdVal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders?limit=6");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        const processed = json.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        const ids = json.map((row) => {
           return row._id;
        });
        setIdVal(ids);
        setData(processed);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${idVal[id]}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      setData((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  


  const processRowUpdate = async (row) => {
    handleDelete(row.id);
    

    
  }

  const columns = [
    { field: "id", headerName: "ID", width: 65 },
    { field: "customerId", headerName: "Customer Id", width: 150, editable: true },
    { field: "deliveryAdress", headerName: "Delivery Address", width: 150, editable: true },
    { field: "createdAt", headerName: "Date", width: 150, editable: true},
    { field: "totalCost", headerName: "Cost", width: 100, type: "number", editable: true },
    { field: "status", headerName: "Status", width: 120, editable: true},
    { field: "comments", headerName: "Comments", width: 100, editable: true },
    {
      field: "order",
      headerName: "Order Details",
      width: 150,
      renderCell: (params) => (

        <Link 
          variant="contained"
          color="primary"
          onClick={() => handleOpen(params.row.order)}
        >
          Details
        </Link>
          
      ),
    },

    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div role="tabpanel" hidden={value !== index} id={`tab-${index}`}>
      {value === index && (
        <Box sx={{ height: "50%", width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            processRowUpdate = {processRowUpdate}
            pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
          />
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder ? (
            <Grid container spacing={2} sx={{ padding: 2 }}>
              {Object.entries(selectedOrder).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </Typography>
                  <Typography variant="body1">
                    {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No order details available.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

OrderList.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
