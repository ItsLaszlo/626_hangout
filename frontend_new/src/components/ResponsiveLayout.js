"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import CloseIcon from "@mui/icons-material/Close";

const ResponsiveLayout = ({ children, adColumn, socialsComponent }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const bannerHeight = "72px";

  // Pass adColumn to EventsList for mobile view
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { adColumn });
    }
    return child;
  });

  return (
    <Box sx={{ position: "relative" }}>
      {/* Socials Button - Always visible */}
      <Box
        sx={{
          position: "fixed",
          top: bannerHeight,
          right: 0,
          zIndex: 1100,
          px: 1,
        }}
      >
        <IconButton
          onClick={() => setDrawerOpen(!drawerOpen)}
          sx={{
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {drawerOpen ? <CloseIcon /> : <ConnectWithoutContactIcon />}
        </IconButton>
      </Box>

      {/* Socials Drawer - Always in drawer mode */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "300px",
            p: 2,
            mt: bannerHeight,
            height: `calc(100% - ${bannerHeight})`,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {socialsComponent}
        </Box>
      </Drawer>

      {/* Main Layout - Center content when no ads */}
      <Box
        sx={{
          maxWidth: { xs: "100%", lg: "1400px" },
          mx: "auto",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            pr: { xs: 4, sm: 5 },
          }}
        >
          {/* Ad Column - Only show on desktop */}
          {isDesktop && (
            <Box
              sx={{
                width: "300px",
                minWidth: "300px",
                display: { xs: "none", lg: "block" },
              }}
            >
              {adColumn}
            </Box>
          )}

          {/* Main Content Area */}
          <Box
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", lg: isDesktop ? undefined : "800px" },
              mx: { xs: 0, lg: isDesktop ? 0 : "auto" },
            }}
          >
            {childrenWithProps}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveLayout;
