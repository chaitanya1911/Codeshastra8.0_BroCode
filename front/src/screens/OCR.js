import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import axiosInstance from "../axios";
import { MDBDataTable } from "mdbreact";
import {
  Box,
  Flex,
  Avatar,
  // Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  HStack,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Table,
  Th,
  Tr,
  Tfoot,
  Td,
  Tbody,
  Thead,
  TableCaption,
  Center,
  Heading,
  Input,
} from "@chakra-ui/react";

function OCR() {
  const [setDate, setSetDate] = useState([]);
  const [dataPresent, setTDataPresent] = useState([]);
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
  const columnsP = [
    {
      label: "Name",
      field: "name",
    },
    {
      label: "Start",
      field: "start",
    },
    {
      label: "End",
      field: "end",
    },
  ];
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const upload = (e) => {
    e.preventDefault();
    console.log(previewSource);
    axiosInstance
      .post("/api/ocr")
      .then((res) => {
        console.log(res.data.data);
        setSetDate(res.data.data);
        // setTDataPresent({ columns: columnsP, rows: res.data.data || [] });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  return (
    <Box p={10}>
      <Heading fontSize={"6xl"} my={"10"}>
        OCR Attendance
      </Heading>
      <form
        onSubmit={(e) => {
          upload(e);
        }}
      >
        <div
          style={{
            display: "flex",
            "justify-content": "space-between",
            height: "20vh",
          }}
        >
          <div>
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value=""
              className="form-input"
              accept="image/png, image/jpeg"
            />
            {previewSource && (
              <>
                {/* <br /> */}
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
              </>
            )}
          </div>
          <Button
            colorScheme="teal"
            variant="solid"
            type="submit"
            size={"lg"}
          >
            Upload
          </Button>
        </div>

        <Table variant="striped" colorScheme="teal">
          <TableCaption>Attendance Sheet</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Entry Time</Th>
              <Th isNumeric>Exit Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>             */}
          </Tbody>          
        </Table>
      </form>
    </Box>
  );
}

export default OCR;
