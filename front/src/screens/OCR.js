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
    Td,Tbody,Thead,TableCaption
  } from "@chakra-ui/react";


function OCR() {
    const [setDate, setSetDate] = useState([])
    const [dataPresent, setTDataPresent] = useState([])
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
    axiosInstance.post('/api/ocr').then((res)=>{
        console.log(res.data.data)
        setSetDate(res.data.data)
        // setTDataPresent({ columns: columnsP, rows: res.data.data || [] });
    })
    .catch((e)=>{
        console.log(e)
    })
  };
  const [fileInputState, setFileInputState] = useState();
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  return (
    <div>
      <input
        id="fileInput"
        type="file"
        name="image"
        style={{ marginLeft: "20px" }}
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
      <form
        onSubmit={(e) => {
          upload(e);
        }}
      >
        <button type="submit">Upload</button>
        <Table variant='simple'>
  <TableCaption>Imperial to metric conversion factors</TableCaption>
  <Thead>
    <Tr>
      <Th>Names</Th>
      <Th>Start Time</Th>
      <Th >End Time</Th>
    </Tr>
  </Thead>
  <Tbody>
      {setDate!==[] &&  setDate.map((m,index)=>{
 return <Tr>
 <Td>{m[0]}</Td>
 <Td>{m[1]}</Td>
 <Td >{m[2]}</Td>
</Tr>
      })}
   
  
  </Tbody>
 
</Table>
      </form>
    </div>
  );
}

export default OCR;
