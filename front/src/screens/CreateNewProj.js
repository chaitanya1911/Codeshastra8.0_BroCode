// import {
//   Box,
//   Center,
//   Flex,
//   Grid,
//   GridItem,
//   Heading,
//   SimpleGrid,
//   Form,
//   useColorModeValue,
// } from "@chakra-ui/react";

import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Center,
  Select,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
// import { Row, Col, Form, Button } from "react-bootstrap";
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

  // FileWorks
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

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
          photo: previewSource,
        },
      })
      .then((res) => {
        navigate("/owner/project");
      })
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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
    } else {
      setPreviewSource("");
      setSelectedFile();
      setFileInputState();
    }
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <Stack minH={"0vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={10} w={"full"} maxW={"md"}>
            <Center>
              <Heading fontSize={"2xl"}>Add a Project Now!</Heading>
            </Center>

            <form onSubmit={handleSubmit}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Project name"
                />
              </FormControl>

              <FormControl id="desc">
                <FormLabel>Description</FormLabel>
                <Input
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  type="desc"
                  placeholder="Project desc"
                />
              </FormControl>

              <FormControl id="choose_contractor">
                <FormLabel>Select Contractor</FormLabel>
                <Select
                  placeholder="Select option"
                  name="contractor"
                  value={formData.contractor}
                  onChange={handleChange}
                >
                  {contractors !== undefined &&
                    contractors.map((contractor) => {
                      return (
                        <option value={contractor.id}>{contractor.name}</option>
                      );
                    })}
                </Select>
              </FormControl>

              {/* <br /> */}
              <FormControl id="date">
                <FormLabel>Enter a date</FormLabel>
                <Input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                ></Input>
              </FormControl>

              <FormControl id="file">
                <FormLabel>Enter the File</FormLabel>
                <Input
                  id="fileInput"
                  type="file"
                  name="image"
                  // style={{ marginLeft: "20px" }}
                  onChange={handleFileInputChange}
                  value=""
                  className="form-input"
                  accept="image/png, image/jpeg"
                />
                {previewSource && (
                  <div id="zoomImg">
                    <img
                      src={previewSource}
                      alt="chosen"
                      style={{
                        height: "200px",
                        padding: "30px",
                        outline: "none",
                        border: "0",
                      }}
                    />
                  </div>
                )}
              </FormControl>

              <Stack spacing={6}>
                {/* <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link>
            </Stack> */}

                <Button
                  colorScheme={"blue"}
                  variant={"solid"}
                  type={"submit"}
                  mt={5}
                >
                  Add
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1} h={"85vh"} pt={20} pr={20}>
          {/* <Center> */}
          <DragableMarkerMap
            formData={formData}
            setloc={setloc}
          ></DragableMarkerMap>
          {/* </Center> */}
        </Flex>
      </Stack>
    </>
  );
}

export default CreateNewProj;
