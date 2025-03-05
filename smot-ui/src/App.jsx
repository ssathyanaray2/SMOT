// App.js
import './App.css';
import Appbar from './components/Appbar.jsx';
import Tabs from './components/Tabs.jsx';
import Customer from './components/Customer.jsx';
// import Footer from './components/Footer.jsx';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: 'linear-gradient(-90deg, LemonChiffon, white)',
        }}
      >
        {/* Routes and Route Configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Tabs />} />
          <Route path="/customer" element={<Customer />} />
        </Routes>
        {/* You can add footer if needed */}
        {/* <Footer /> */}
      </Box>
    </BrowserRouter>
  );
}

export default App;
