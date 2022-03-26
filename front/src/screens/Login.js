import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Col, Navbar, Row, Form } from "react-bootstrap";
import axiosInstance from "../axios";
import { Context } from "../ContextData";

function Login() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const [setUserData] = useContext(Context);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("token/", {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        let acc_token = "JWT " + res.data.access;
        axiosInstance.defaults.headers["Authorization"] = acc_token;
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        const loginuser = async () =>
          await axiosInstance
            .post("api/login", {
              data: {
                username: formData.username,
              },
            })
            .then((res) => {
              if (res.data.type === 1) {
                localStorage.setItem("wid", res.data.id);
                localStorage.setItem('name',res.data.name);
                localStorage.setItem('type',res.data.type);
                setUserData({
                  name: res.data.name,
                  id: res.data.id,
                  type: res.data.type,
                  isLoggedIn: true
                })
                navigate("/owner");
              } else if (res.data.type === 2) {
                localStorage.setItem('name',res.data.name)
                localStorage.setItem("wid", res.data.id);
                localStorage.setItem('type',res.data.type);
                setUserData({
                  name: res.data.name,
                  id: res.data.id,
                  type: res.data.type,
                  isLoggedIn: true
                })
                navigate("/contractor");
              } else {
                localStorage.setItem('name',res.data.name)
                localStorage.setItem("wid", res.data.id);
                localStorage.setItem('type',res.data.type);
                setUserData({
                  name: res.data.name,
                  id: res.data.id,
                  type: res.data.type,
                  isLoggedIn: true
                })
                navigate("/worker");
              }
            })
            .catch((e) => console.log(e));
        loginuser();
      })
      .catch((e) => console.log(e));
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={10} mx={"auto"} maxW={"lg"} padding="50px 0 150px 0">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              New user?{" "}
              <Link
                color={"blue.400"}
                onClick={(e) => {
                  navigate("/signup");
                }}
              >
                Signup
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
