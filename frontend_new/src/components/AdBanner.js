import React from "react";
import { Box } from "@mui/material";

const AdBanner = ({ index = 1 }) => {
  return (
    <Box
      role="complementary"
      aria-label={`Advertisement ${index}`}
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
      Your Ad Here! {index}/3 <br />
      (300x250)
    </Box>
  );
};

export default AdBanner;
// Purpose:  Ad space
