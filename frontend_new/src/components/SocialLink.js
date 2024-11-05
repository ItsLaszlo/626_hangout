// "use client";

import React from "react";
import { Button } from "@mui/material";
import RedditIcon from "@mui/icons-material/Reddit";
import XIcon from "@mui/icons-material/X";

const PLATFORM_CONFIG = {
  twitter: {
    icon: <XIcon />,
    baseUrl: "https://twitter.com",
  },
  reddit: {
    icon: <RedditIcon />,
    baseUrl: "https://reddit.com",
  },
};

export default function SocialLink({ platform, username }) {
  const { icon, baseUrl } = PLATFORM_CONFIG[platform];
  const url = `${baseUrl}/${username}`;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textTransform: "none",
        bgcolor: "secondary.main",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "secondary.dark",
        },
        mb: 1,
        width: "100%",
        justifyContent: "flex-start",
      }}
    >
      {username}
    </Button>
  );
}
// Purpose:  Button component that links to either Twitter or Reddit social media accounts
