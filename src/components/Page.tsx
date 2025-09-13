import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

export default function Page({title, children}: {title?: string, children: React.ReactNode}){
  return (
    <Container sx={{py:4}}>
      {title && <Typography variant="h5" gutterBottom>{title}</Typography>}
      <Box sx={{bgcolor:"background.paper", p:2, borderRadius:2}}>{children}</Box>
    </Container>
  );
}
