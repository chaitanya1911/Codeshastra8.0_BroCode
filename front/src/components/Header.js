import React, { useContext } from "react";
import $ from "jquery";
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
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import "../styles/styles.css";
import axiosInstance from "../axios";
import { Context } from "../ContextData";

function Header() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [baseData, userData, setUserData] = useContext(Context);

  const Links = ["Dashboard", "Projects", "Team", "SignUp", "Contact"];
  const LinksTo = {
    Home: "/dashbord",
    Projects: "/projects",
    Team: "/team",
  };

  const LinkNav = {
    1: [],
    2: [
      { page: "Home", link: "/contractor/dashboard/home" },
      { page: "Attendance", link: "/contractor/dashboard/attendance" },
      { page: "Assign", link: "/contractor/dashboard/assign" },
      { page: "Violations", link: "/contractor/dashboard/violations" },
      { page: "OCR", link: "/contractor/dashboard/ocr" },
    ],
    3: [
      { page: "Home", link: "/worker/dashboard/" },
      // { page: "Home", link: "/contractor/dashboard/home" },
      // { page: "Assign", link: "/contractor/dashboard/assign" },
      // { page: "Violations", link: "/contractor/dashboard/violations" },
      // { page: "OCR", link: "/contractor/dashboard/ocr" },
    ],
  };

  const LinkToContractor = [
    { page: "Home", link: "/contractor/dashboard/" },
    { page: "Assign", link: "/contractor/dashboard/assign" },
    { page: "Violations", link: "/contractor/dashboard/violations" },
  ];

  const LinkToWorker = [
    { page: "Home", link: "/contractor/dashboard/" },
    // { page: "Statistics", link: "/contractor/dashboard/statistics" },
  ];

  $(function () {
    var header = $("#header"),
      height = header.height(),
      yOffset = 0,
      triggerPoint = 30;
    //$('.header-height').css('height', height+'px');
    $(window).on("scroll", function () {
      yOffset = $(window).scrollTop();

      if (yOffset >= triggerPoint) {
        header.removeClass("animated cssanimation fadeIn");
        header.addClass("navbar-fixed-top  cssanimation animated fadeInTop");
      } else {
        header.removeClass("navbar-fixed-top cssanimation  animated fadeInTop");
        header.addClass("animated cssanimation fadeIn");
      }
    });
  });

  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={children}
      // to={`/`}
    >
      {children}
    </Link>
  );
  return (
    <Box
      id="header"
      bg={useColorModeValue("gray.100", "gray.900")}
      zIndex={200}
      px={4}
      as="header"
      backdropFilter="saturate(180%) blur(5px)"
      w="100%"
      style={{ position: "sticky", top: 0 }}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>AICAN</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {LinkNav[userData.type] &&
              LinkNav[userData.type].map((link, key) => (
                <NavLink key={key} children={link.link}>
                  {link.page}
                </NavLink>
              ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={userData.photo} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} src={userData.photo} />
                </Center>
                <br />
                <Center>
                  {userData.isLoggedIn ? (
                    <p>Hello {userData.name}!</p>
                  ) : (
                    <p>Hello User!</p>
                  )}
                </Center>
                <br />
                <MenuDivider />
                {!userData.isLoggedIn ? (
                  <>
                    <Link to={"/login"}>
                      <MenuItem>Sign In</MenuItem>
                    </Link>
                    <Link to={"/signup"}>
                      <MenuItem>Sign Up</MenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <MenuItem>Edit Profile</MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        setUserData({
                          isLoggedIn: false,
                          name: "user",
                          type: "",
                          id: "",
                        });
                        axiosInstance.post("logout/blacklist/", {
                          refresh_token:
                            sessionStorage.getItem("refresh_token"),
                        });
                        localStorage.clear();
                        axiosInstance.defaults.headers["Authorization"] = null;
                        navigate("/login");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>

      {/* {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null} */}
    </Box>
  );
}

export default Header;
