import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function Projects() {
  const navigate = useNavigate();
  const [Projects, setProjects] = useState([])
  useEffect(() => {
    axiosInstance.get('/api/getprojects')
      .then((res) => {
        setProjects(res.data.projects)
        console.log(res.data.projects)

      })

    return () => {

    }
  }, [])

  function addProj(e) {
    navigate("/owner/createNewProj");
  }
  return (
    <>
      <Center my={10}><Heading fontSize={'6xl'}>Create Project</Heading></Center>
      <Center>
        <Button
          type="button"
          onClick={(e) => {
            addProj(e);
          }}
          size={'lg'}
          colorScheme='teal' variant='outline'>
          ADD
        </Button>
      </Center>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        {
          Projects !== undefined && Projects.map((project) => {
            return (<Box>
              <Card data={project}></Card>
            </Box>)
          })
        }

      </SimpleGrid>
    </>
  );
}

export default Projects;
