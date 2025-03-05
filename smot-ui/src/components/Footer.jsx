import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="blue">
        © {new Date().getFullYear()} SMOT. All rights reserved.
      </Typography>
    </Box>
  );
}
