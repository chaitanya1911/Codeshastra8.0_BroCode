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
import { Row, Col } from "react-bootstrap";
import styles from "./Dashboard.module.scss";
import AttendanceChart from "./DashboardComp/AttendanceChart";
import Grid1 from "./DashboardComp/Grid1";
import TopNav from "./DashboardComp/TopNav";
import MyMap from "../components/MyMap";
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
