"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CloseIcon from "@mui/icons-material/Close";

const ResponsiveLayout = ({ children, adColumn, socialsComponent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const bannerHeight = "72px"; // Match your banner height

  return (
    <Box sx={{ position: "relative" }}>
      {/* Mobile Header with Menu Button */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: bannerHeight, // Position below banner
            right: 0,
            zIndex: 1100,
            p: 1,
          }}
        >
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            sx={{
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {mobileMenuOpen ? <CloseIcon /> : <ConnectWithoutContactIcon />}
          </IconButton>
        </Box>
      )}

      {/* Mobile Drawer for Socials */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "300px",
            p: 2,
            mt: bannerHeight, // Position below banner
            height: `calc(100% - ${bannerHeight})`, // Adjust height to account for banner
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {socialsComponent}
        </Box>
      </Drawer>

      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* Ad Column - Full Width on Mobile */}
        <Box
          sx={{
            display: { xs: "block", lg: isTablet ? "none" : "block" },
            width: { xs: "100%", lg: "300px" },
            mb: { xs: 2, lg: 0 },
          }}
        >
          {adColumn}
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {/* Events List */}
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 75%" },
              width: "100%",
            }}
          >
            {children}
          </Box>

          {/* Desktop Socials */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: "0 0 25%",
            }}
          >
            {socialsComponent}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveLayout;
