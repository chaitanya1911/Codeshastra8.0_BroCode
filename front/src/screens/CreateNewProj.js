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
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DragableMarkerMap from "../components/DragableMarkerMap";
import axiosInstance from "../axios";

function CreateNewProj() {
  const initialFormData = Object.freeze({
    lats: "",
    long: "",
    name: "",
    desc: "",
    contractor: "",
    date: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [contractors, setContractors] = useState([]);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axiosInstance
      .post("/api/createproj", {
        data: {
          lats: formData.lats,
          long: formData.long,
          name: formData.name,
          desc: formData.desc,
          contractor: formData.contractor,
          date: formData.date,
        },
      })
      .then((res) => {})
      .catch((e) => console.log(e));
  };
  function setloc(lat, lng) {
    updateFormData((prev) => ({
      ...prev,
      lats: lat,
      long: lng,
    }));
  }
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get("/api/getContract").then((res) => {
      console.log(res.data);
      setContractors(res.data.data);
    });

    return () => {};
  }, []);

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
        <Form onSubmit={handleSubmit}>
          <Box>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="name"
              placeholder="Project name"
            ></input>
            <br />
            <input
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              type="desc"
              placeholder="Project desc"
            ></input>
            <br />
            <Form.Select
              name="contractor"
              value={formData.contractor}
              onChange={handleChange}
              aria-label="Default select example"
            >
              <option value="">Open this select menu</option>
              {contractors !== undefined &&
                contractors.map((contractor) => {
                  return (
                    <option value={contractor.id}>{contractor.name}</option>
                  );
                })}
            </Form.Select>
            <br />
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
            ></input>
          </Box>
          <Box>
            {" "}
            <DragableMarkerMap
              formData={formData}
              setloc={setloc}
            ></DragableMarkerMap>
          </Box>
          <Button type="submit">Create</Button>
        </Form>
      </SimpleGrid>
    </>
  );
}

export default CreateNewProj;
