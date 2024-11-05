import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SocialLink from "./SocialLink";
import { SOCIAL_DATA } from "../data/socialData";

export default function SocialsComponent() {
  return (
    <Box sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h3" gutterBottom>
        Socials
      </Typography>

      {/* Main container stack - handles row/column layout */}
      {/* <Stack container spacing={3}> */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "100%" }}
      >
        {/* <Stack item xs={12} md={6}> */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            City Official Socials:
          </Typography>
          {SOCIAL_DATA.official.map((social, index) => (
            <SocialLink
              key={`${social.platform}-${social.username}`}
              {...social}
            />
          ))}
        </Stack>
        {/* <Stack item xs={12} md={6}> */}
        <Stack spacing={2} sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Community Socials:
          </Typography>
          {SOCIAL_DATA.community.map((social, index) => (
            <SocialLink
              key={`${social.platform}-${social.username}`}
              {...social}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
// Purpose: Parent component/container that displays Social-related media links
