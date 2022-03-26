import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from "@chakra-ui/react";
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axiosInstance from "../axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, updateFormData] = useState({
    email: "",
    pass: "",
    last_name: "",
    first_name: "",
  });
  const navigate = useNavigate();

  //Call this on Form Submit
  const addNewUserChatEngine = (e) => {
    e.preventDefault();
    var data = {
      username: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      secret: 12345,
    };

    var config = {
      method: "post",
      url: "https://api.chatengine.io/users/",
      headers: {
        "PRIVATE-KEY": "e6d70f37-1834-409d-8066-7bc3096e63c4",
      },
      data: data,
    };
    const createuser = async () =>
      await axiosInstance
        .post("/api/signup", {
          data: formData,
        })
        .then((res) => {
          if (!res.data.exists) {
            let newchat = async () =>
              await axios(config)
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  console.log(error);
                });
            newchat();
            navigate("/login");
          } else {
            alert("User already exists");
          }
        });
    createuser();
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  function handleGoogleResponse(res){
    let data = res.profileObj
    updateFormData(prev=>({
      ...prev,
      email:data.email,
      first_name:data.givenName,
      last_name:data.familyName
    }))
  }
  function handleGoogleFailure(){

  }

  return (
    <Flex
      minH={"90vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Form onSubmit={addNewUserChatEngine}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} padding="50px 0 50px 0">
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <GoogleLogin
            className="loginBtn loginBtn--google"
            clientId="306135960012-n2q7oim0cqsniplb01di0m7493t41qp1.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleResponse}
            onFailure={handleGoogleFailure}
          />
          <Center>
         <h3 style={{margin:0 ,padding:0 ,color:"grey"}}>OR</h3>
          </Center>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="first_name"
                      value={formData.first_name}
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="last_name"
                      value={formData.last_name}
                      type="text"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name="pass"
                    value={formData.pass}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    color={"blue.400"}
                    onClick={(e) => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Form>
    </Flex>
  );
}
