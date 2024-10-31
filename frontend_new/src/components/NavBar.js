import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          626 Hangout
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/about">
          About
          {/* TODO: add typography */}
        </Button>
        {/* Add more navigation items here in the future */}
      </Toolbar>
    </AppBar>
  );
}
