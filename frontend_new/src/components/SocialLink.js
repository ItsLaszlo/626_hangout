import React from 'react';
import { Button, Box } from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';

export default function SocialLink({ platform, username }) {
  const icon = platform === 'twitter' ? <XIcon /> : <RedditIcon />;
  const url =
    platform === 'twitter'
      ? `https://twitter.com/${username}`
      : `https://reddit.com/${username}`;

  return (
    <Button
      variant="contained"
      startIcon={icon}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textTransform: 'none',
        backgroundColor: '#D4C6A1',
        color: '#24201F',
        '&:hover': {
          backgroundColor: '#C4B691',
        },
        mb: 1,
        width: '100%',
        justifyContent: 'flex-start',
      }}
    >
      {username}
    </Button>
  );
}
