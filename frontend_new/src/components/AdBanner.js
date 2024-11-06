import React from "react";
import { Box } from "@mui/material";

const AdBanner = ({ index = 1 }) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "250px",
        bgcolor: `grey.${200 + index * 100}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
      }}
    >
      Ad Space {index} (300x600)
    </Box>
  );
};

export default AdBanner;
