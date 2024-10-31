import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import SocialLink from "./SocialLink";

export default function SocialsComponent({}) {
  const officialSocials = [
    { platform: "twitter", username: "@cityofalhambra" },
    { platform: "twitter", username: "@SanGabrielCity" },
    { platform: "twitter", username: "@CityofRosemead" },
    { platform: "twitter", username: "@ConnectwithTC" },
    { platform: "twitter", username: "@DiscoverArcadia" },
  ];

  const communitySocials = [
    { platform: "twitter", username: "@ActiveSGV" },
    { platform: "twitter", username: "@gallerynucleus" },
    { platform: "reddit", username: "r/sgv" },
    { platform: "reddit", username: "r/pasadena" },
    { platform: "reddit", username: "r/alhambra" },
  ];

  return (
    <Box sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h3" gutterBottom>
        Socials
      </Typography>
      <Stack container spacing={3}>
        <Stack item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            City Official Socials:
          </Typography>
          {officialSocials.map((social, index) => (
            <SocialLink key={index} {...social} />
          ))}
        </Stack>
        <Stack item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Community Socials:
          </Typography>
          {communitySocials.map((social, index) => (
            <SocialLink key={index} {...social} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
