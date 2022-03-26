import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  useDisclosure,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axiosInstance from "../axios";
import Edit from "../images/edit-icon.png";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, updateFormData] = useState({
    email: "",
    pass: "",
    last_name: "",
    first_name: "",
    imgUrl: "",
  });
  const navigate = useNavigate();

  //Call this on Form Submit
  const addNewUserChatEngine = (e) => {
    e.preventDefault();
    var data = {
      username: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      imgUrl: formData.imgUrl,
    };

    const createuser = async () =>
      await axiosInstance
        .post("/api/signup", {
          data: formData,
        })
        .then((res) => {
          if (!res.data.exists) {
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
  function handleGoogleResponse(res) {
    let data = res.profileObj;
    updateFormData((prev) => ({
      ...prev,
      email: data.email,
      first_name: data.givenName,
      last_name: data.familyName,
      imgUrl: data.imageUrl,
    }));
    setPic(false);
  }
  function handleGoogleFailure() {}
  async function startVideo() {
    let video = document.querySelector("#webCamera");
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
  }
  function stopStreamedVideo() {
    let videoElem = document.querySelector("#webCamera");
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    videoElem.srcObject = null;
  }
  function drawImge() {
    var video = document.querySelector("#webCamera");
    var canvas = document.querySelector("#videoCanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    var faceArea = 300;
    var pX = canvas.width / 2 - faceArea / 2;
    var pY = canvas.height / 2 - faceArea / 2;

    ctx.rect(pX, pY, faceArea, faceArea);
    ctx.lineWidth = "6";
    ctx.strokeStyle = "green";
    ctx.stroke();

    setTimeout(drawImge, 100);
  }
  function imagedata_to_image(imagedata) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    console.log(image);
    return canvas.toDataURL();
  }
  function clickPic() {
    let canvas = document.createElement("canvas");
    console.log(canvas);
    canvas.height = 200;
    canvas.width = 200;
    let video = document.querySelector("#webCamera");
    canvas.getContext("2d").drawImage(video, 0, 0, 200, 260);
    let image_data_url = canvas.toDataURL("image/jpeg");
    console.log(image_data_url);

    // data url of the image
    convertURIToImageData(image_data_url).then(function (imageData) {
      // Here you can use imageData
      // console.log(imageData);

      // setPic(imageData)
      updateFormData((prev) => ({
        ...prev,
        imgUrl: imagedata_to_image(imageData),
      }));
    });
    setPic(true);

    onClose();
    stopStreamedVideo();
  }
  function convertURIToImageData(URI) {
    return new Promise(function (resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        image = new Image();
      image.addEventListener(
        "load",
        function () {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        },
        false
      );
      image.src = URI;
    });
  }
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={(e) => {
          onClose();
          stopStreamedVideo();
        }}
        size="400px 400px"
      >
        <ModalOverlay />
        <ModalContent maxW={"43rem"}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <button
              type="button"
              onClick={(e) => {
                startVideo();
              }}
            >
              Start Capture
            </button>
            <video
              autoPlay={true}
              id="webCamera"
              onPlay={(e) => {
                // const video = document.getElementById('video')
                setTimeout(drawImge, 300);
              }}
              style={{ display: "none" }}
            >
              {" "}
            </video>

            <canvas id="videoCanvas"></canvas>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={(e) => {
                clickPic();
              }}
            >
              Click
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Avatar
                  size={"50px"}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    borderRadius: "100%",
                  }}
                  alt={"Avatar Alt"}
                  mb={4}
                  pos={"relative"}
                  width="200"
                  height="200"
                  src={formData.imgUrl || ""}
                />

                <button
                  style={{
                    content: '""',
                    w: 10,
                    h: 10,
                    bg: "grey",
                    backgroundImage: `${Edit}`,
                    backgroundRepeat: "none",
                    backgroundSize: "cover",
                    border: "0px",
                    rounded: "full",
                    pos: "absolute",
                    bottom: 0,
                    marginTop: "0px",
                    left: 10,
                  }}
                  onClick={(e) => {
                    onOpen();
                  }}
                  type="button"
                >
                  Click Photo
                </button>
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
            <Center>
              <h3 style={{ margin: 0, padding: 0, color: "grey" }}>OR</h3>
            </Center>
            <GoogleLogin
              className="loginBtn loginBtn--google"
              clientId="306135960012-n2q7oim0cqsniplb01di0m7493t41qp1.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={handleGoogleResponse}
              onFailure={handleGoogleFailure}
            />
          </Stack>
        </Form>
      </Flex>
    </>
  );
}
