import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SocialLink from "./SocialLink";
import { SOCIAL_DATA } from "../data/socialData";

export default function SocialsComponent() {
  return (
    <Box
      sx={{
        borderRadius: 2,
        maxWidth: "100%",
        mx: "auto",
        p: { xs: 0, md: 0 }, // Remove padding to align with main title
      }}
    >
      <Typography
        variant="h3" // Match the main title's
        sx={{
          fontSize: "2rem", // Smaller size since it's a sidebar
          mb: 2, // Add margin bottom for spacing
          fontWeight: "bold",
        }}
      >
        Socials
      </Typography>

      <Stack
        spacing={2} // Reduced spacing
        sx={{
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem", // Smaller size for subsections
              fontWeight: "medium",
            }}
            gutterBottom
          >
            City Official Socials:
          </Typography>
          {SOCIAL_DATA.official.map((social) => (
            <SocialLink
              key={`${social.platform}-${social.username}`}
              {...social}
            />
          ))}
        </Stack>

        <Stack spacing={2}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.1rem",
              fontWeight: "medium",
            }}
            gutterBottom
          >
            Community Socials:
          </Typography>
          {SOCIAL_DATA.community.map((social) => (
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
