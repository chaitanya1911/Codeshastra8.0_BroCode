import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import $ from "jquery";
import {
  Box,
  Flex,
  Avatar,
  Link,
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
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import "../styles/styles.css";
import axiosInstance from "../axios";

function Header() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: 'user',
  });

  const checkLogIn = () => {
    const userName = localStorage.getItem('name');
    console.log(userName)
    if (userName) {
      setUser({
        isLoggedIn: true,
        name: userName,
      })
    }
  }

  useEffect(() => {
    checkLogIn();
  }, [])

  // const Links = ["Dashboard", "Projects", "Team", "SignUp", "Contact"];
  // const LinksTo = {
  //   Dashboard: "/",
  //   Projects: "/projects",
  //   Team: "/team",
  //   SignUp: "/signup",
  //   Contact: "/contact",
  // };
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

  // const NavLink = ({ children }) => (
  //   <Link
  //     px={2}
  //     py={1}
  //     rounded={"md"}
  //     _hover={{
  //       textDecoration: "none",
  //       bg: useColorModeValue("gray.200", "gray.700"),
  //     }}
  //     href={`${LinksTo[children]}`}
  //   >
  //     {children}
  //   </Link>
  // );
  return (
    <Box
      id="header"
      bg={useColorModeValue("gray.100", "gray.900")}
      zIndex={200}
      px={4}
      as="header"
      backdropFilter="saturate(180%) blur(5px)"
      w="100%"
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
          <Box>My Logo</Box>
          {/* <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack> */}
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
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  {
                    user.isLoggedIn ? (
                      <p>Hello {user.name}!</p> 
                    ) : ( <p>Hello User!</p> )
                  }
                </Center>
                <br />
                <MenuDivider />
                {!user.isLoggedIn ? (
                  <>
                    <MenuItem>Sign In</MenuItem>
                    <MenuItem>Sign Up</MenuItem>
                  </>
                ) : (
                  <MenuItem
                    onClick={(e) => {
                      setUser({isLoggedIn: false,
                        name: 'user',})
                      axiosInstance.post("logout/blacklist/", {
                        refresh_token: sessionStorage.getItem("refresh_token"),
                      });
                      localStorage.clear();
                      axiosInstance.defaults.headers["Authorization"] = null;
                      navigate("/login");
                    }}
                  >
                    Logout
                  </MenuItem>

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