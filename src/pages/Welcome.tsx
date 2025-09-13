import React from "react";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Page>
      <Stack
        spacing={4}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={600} color="primary">
          🚀 Welcome to Smarterr
        </Typography>

        <Typography variant="h6" color="text.secondary" maxWidth={600}>
          Find trusted local service providers — electricians, tutors,
          babysitters, and more. Or register as a provider and grow your
          business.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="large" onClick={() => navigate("/providers")}>
            Explore Providers
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate("/register")}>
            Get Started
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}
