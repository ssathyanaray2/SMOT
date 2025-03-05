import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Order Form" id='tab-0' />
          <Tab label="Order List" id='tab-1' />
        </Tabs>
      </Box>
      <OrderForm value={value} index={0}></OrderForm>
      <OrderList value={value} index={1}></OrderList>
    </Box>
  );
}
