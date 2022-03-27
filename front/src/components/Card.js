import React from 'react';
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  HStack,
  Stack,
  Text,
  Box,
  useColorModeValue,
  Wrap,
  WrapItem,
  GridItem,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";
import { Container } from 'react-bootstrap';


const Card = ({data}) => {

  const CardComp1 = ({data}) => (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      w={{ sm: '100%', md: '540px' }}
      height={{ sm: '476px', md: '20rem' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      padding={4}>
      <Flex flex={1} bg="blue.200">
        <Image
          objectFit="cover"
          boxSize="100%"
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}>
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {console.log(data)}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
          {data.name}
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          {data.desc}
          
        </Text>
      

        <Stack
          width={'100%'}
          mt={'2rem'}
          direction={'row'}
          padding={2}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Message
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Follow
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )

  const CardComp = ({data}) => (
    <HStack
      border={'1px'} borderColor={'grey'} borderRadius={'lg'}
      bg={useColorModeValue("gray.100", "gray.900")}
      p={2}
      boxShadow={'2xl'}
    >
      <Flex flex={1} bg="blue.200">
        <Image
          objectFit="cover"
          boxSize="100%"
          borderRadius={'lg'}
          // borderColor={'grey'}
          // border={'1px'}
          src={
            data.photo
           }
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={1}
        pt={2}
      >
        <Heading fontSize={"xl"} fontFamily={"body"}>
        {data.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} size="sm" mb={4} fontSize={'sm'}>
        {data.email}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={1}
          fontSize={'sm'}
        >
  {data.desc}
        </Text>
      

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </HStack>
  );

  return (
    <>
      <CardComp data={data} />
    </>

  )
}

export default Card
