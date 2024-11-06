"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AdBanner from "./AdBanner";

const AdColumn = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollPosition = window.scrollY;

      // Start moving ads up after scrolling past 72px (title height)
      // but limit the movement to not go higher than -72px
      if (scrollPosition > 72) {
        const newOffset = Math.min(scrollPosition - 72, 72);
        setScrollOffset(newOffset);
      } else {
        setScrollOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        width: "300px",
        display: { xs: "none", lg: "block" },
        position: "relative",
        mt: "72px",
      }}
    >
      {/* Fixed position container for all three ads */}
      <Box
        sx={{
          position: "fixed",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transform: `translateY(-${scrollOffset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <AdBanner index={1} />
        <AdBanner index={2} />
        <AdBanner index={3} />
      </Box>

      {/* Spacer box to maintain scroll height */}
      <Box
        sx={{
          width: "300px",
          height: "calc(1800px + 32px)",
          visibility: "hidden",
        }}
      />
    </Box>
  );
};

export default AdColumn;
