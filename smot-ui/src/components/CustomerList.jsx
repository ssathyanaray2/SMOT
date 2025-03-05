import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';


export default function CustomerList(props) {

    const { value, index } = props;

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'Date',
        headerName: 'Date',
        type: 'date',
        width: 150,
        editable: false,
      },
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
      {
        field: 'Address',
        headerName: 'Address',
        width: 150,
        editable: true,
      },
      {
        field: 'Order Details',
        headerName: 'Order Details',
        width: 150,
        editable: true,
      },
      {
        field: 'Quantity',
        headerName: 'Quantity',
        width: 150,
        type: 'number',
        editable: false,
      },
      {
        field: 'Cost',
        headerName: 'Cost',
        width: 150,
        type: 'number',
        editable: true,
      },
      {
        field: 'Discount',
        headerName: 'Discount',
        width: 150,
        editable: true,
      },
      {
        field: 'Status',
        headerName: 'Status',
        width: 150,
        editable: true,
      },
    ];
    
    const rows = [
      { id: 1, firstName: 'Jon', age: 14 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      { id: 1, firstName: 'Jon', age: 14 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 }
      ];

  return (
    <div
      role="tabpanel"
    > 
    {value === index && 
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={rows}
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