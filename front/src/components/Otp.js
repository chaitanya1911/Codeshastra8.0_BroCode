import React,{useState} from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
import {Form} from 'react-bootstrap'
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
function Otp({verified}) {
    const navigate = useNavigate()
    const initialFormData = Object.freeze({
        number: "",
        email: "alankritarya15@gmail.com",
        otp:null
      });
    
      const [formData, updateFormData] = useState(initialFormData);
      const[show,setShow] = useState(false)
      const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
          .post("/api/generateotp", {
              data:
           { number: formData.number,
            email: formData.email,}
          })
          .then(res=>{
              if(res.data.exists){
                setShow(true)
              }
              else{
                alert("doesnt exist")
              }
          })
          .catch(e=>console.log(e))
        }
        function verify(e){
            e.preventDefault();
            axiosInstance
              .post("/api/verifyotp", {
                  data:{
                    id:localStorage.getItem('wid'),
                email:formData.email,
                  number:formData.number,    
                  otp:formData.otp}
              })
              .then(res=>{
                  if(res.data.done){
                    setShow(false)
                    window.location.reload()
                  }
                  else{
                    alert("Wrong Otp")
                  }
              })
              .catch(e=>console.log(e))
        }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
              <FormControl id="email">
              {!show && <>
                <FormLabel>Aadhar Number: {verified?"Verified":"Not Verified"}</FormLabel>
                {!verified?<Input
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  type="text"
                  required
                />:<></>}
                </>}
                {show &&<><FormLabel>OTP:</FormLabel>
                <Input
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  type="number"
                /></>}
                {show && <Button
                style={{marginTop:"10px"}}
                onClick={verify}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Verify
                </Button>}
                {!show && !verified && <Button
                style={{marginTop:"10px"}}
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Generate OTP
                </Button>}
                <Button
                style={{marginLeft:"10px", marginTop:"10px"}}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Update
                </Button>
              </FormControl>
        </Form>    
    </div>
  )
}

export default Otp