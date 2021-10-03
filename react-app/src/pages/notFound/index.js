import React from "react";
import { Box, Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <Box
        style={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h2">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="h6">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box style={{ textAlign: "center" }}>
            <img
              alt="Under development"
              src="/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
