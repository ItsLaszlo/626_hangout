// "use client";

import React from "react";
import { Button } from "@mui/material";
import RedditIcon from "@mui/icons-material/Reddit";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";

const PLATFORM_CONFIG = {
  twitter: {
    icon: <XIcon />,
    baseUrl: "https://twitter.com",
    isEmail: false,
  },
  reddit: {
    icon: <RedditIcon />,
    baseUrl: "https://reddit.com",
    isEmail: false,
  },
  email: {
    icon: <EmailIcon />,
    baseUrl: "mailto:",
    isEmail: true,
  },
};

export default function SocialLink({
  platform,
  username,
  subject = "",
  body = "",
}) {
  const { icon, baseUrl, isEmail } = PLATFORM_CONFIG[platform];
  const url = isEmail
    ? `${baseUrl}${username}${
        subject ? `?subject=${encodeURIComponent(subject)}` : ""
      }${body ? `&body=${encodeURIComponent(body)}` : ""}`
    : `${baseUrl}/${username}`;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      href={url}
      target={isEmail ? "_self" : "_blank"} // Email links should open in same window
      rel={isEmail ? undefined : "noopener noreferrer"}
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
      {isEmail ? "626Hangout@gmail.com" : username}{" "}
      {/* Change button text for email */}
    </Button>
  );
}
// Purpose:  Button component that links to either Twitter or Reddit social media accounts
