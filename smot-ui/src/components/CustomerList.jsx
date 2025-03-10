import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';


export default function CustomerList(props) {

    const { value, index } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/customers?limit=6');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          const processed = json.map((row, index) => ({
            ...row,
            id: index + 1
          }));

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

    const columns = [
      { field: 'id', headerName: 'ID', width: 65 },
      {
        field: 'name',
        headerName: 'First name',
        width: 125,
        editable: true,
      },
      {
        field: 'address',
        headerName: 'Address',
        width: 200,
        editable: true,
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 150,
        editable: false,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 170,
        editable: true,
      },
      {
        field: 'dateOfFirstOrder',
        headerName: 'Date',
        width: 150,
        editable: false,
      },
      {
        field: 'totalPurchased',
        headerName: 'Total Pruchased',
        width: 75,
        type: 'number',
        editable: true,
      },
      {
        field: 'comments',
        headerName: 'Comments',
        width: 200,
        editable: true
      }
    ];
  

  return (
    <div
      role="tabpanel"
    > 
    {value === index && 
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
          />
      </Box>
    }
    </div>
  );

}

CustomerList.propTypes = {
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };