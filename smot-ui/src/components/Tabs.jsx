import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import PropTypes from 'prop-types';

export default function BasicTabs(prop) {

  const tabValue = prop.tabValue;
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(0);
  }, [tabValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    { tabValue === "order" && (
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
    )
    }

    { tabValue === "customer" && (
      <Box sx={{ width: '100%'}}>
        <Box>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Customer Form" id='tab-0' />
            <Tab label="Customer List" id='tab-1' />
          </Tabs>
        </Box>
        <CustomerForm value={value} index={0}></CustomerForm>
        <CustomerList value={value} index={1}></CustomerList>
      </Box>
    )
    }
    </>
  );
};

BasicTabs.propTypes = {
    tabValue: PropTypes.string.isRequired
  };
