import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  function addProj(e) {
    navigate("/createNewProj");
  }
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          addProj(e);
        }}
      >
        Add Projects
      </button>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Box>
          <Card></Card>
        </Box>
        <Box>
          <Card></Card>
        </Box>
        <Box>
          <Card></Card>
        </Box>
      </SimpleGrid>
    </>
  );
}

export default Projects;
