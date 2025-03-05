import PropTypes from "prop-types";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";

export default function CustomerForm(props) {
    const { value, index } = props;

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
              Customer Form
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField label="Name" rows={1} fullWidth sx={{ mb: 2 }} />
            <TextField label="Phone Number" rows={1} fullWidth sx={{ mb: 2 }} />
            <TextField label="Email" rows={1} fullWidth sx={{ mb: 2 }} />
            <TextField label="Comments" multiline rows={3} fullWidth sx={{ mb: 2 }} />
            <TextField label="Address" multiline rows={3} fullWidth sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" fullWidth>
              Submit
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
        </Box>
      </Grid>
    </Grid>
    </div>
  );

};

CustomerForm.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};