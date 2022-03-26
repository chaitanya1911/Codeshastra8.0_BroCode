import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import styles from "./Dashboard.module.scss";
import AttendanceChart from "./DashboardComp/AttendanceChart";
import Grid1 from "./DashboardComp/Grid1";
import TopNav from "./DashboardComp/TopNav";
import MyMap from "../components/MyMap";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import DragableMarkerMap from "../components/DragableMarkerMap";

function CreateNewProj() {
  const navigate = useNavigate();
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <Box>
          <Form>
            <input type="name" placeholder="Project name"></input>
            <br />
            <input type="desc" placeholder="Project desc"></input>
            <br />
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <br />
            <input type="date"></input>
          </Form>
        </Box>
        <Box>
          {" "}
          <DragableMarkerMap></DragableMarkerMap>
        </Box>
      </SimpleGrid>
    </>
  );
}

export default CreateNewProj;
