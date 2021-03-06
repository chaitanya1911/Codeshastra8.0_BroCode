import React,{useState,useEffect} from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import Otp from '../components/Otp';
  import { SmallCloseIcon } from '@chakra-ui/icons';
import axiosInstance from '../axios';

function EditProfile() {
    const initialFormData = Object.freeze({
        number: "",
        email: localStorage.getItem('email'),
        otp:null
      });
    
    const [formData, updateFormData] = useState(initialFormData);
    const[prof,setProf] = useState({})
    const[show,setShow] = useState(false)
    useEffect(()=>{
        const data=async()=>await axiosInstance.get(`api/getWProf/${localStorage.getItem('wid')}`)
        .then(res=>{
            setProf(res.data.worker)
        }) 
        .catch(e=>console.log(e))
        data()
    },[])
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
        
    return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar size="xl" src={prof.photo}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Change Icon</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName">
              <FormLabel>User name</FormLabel>
              <Input
                placeholder={prof.name}
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={prof.name}
                diabled
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                value={prof.email}
              />
            </FormControl>
            <Stack spacing={6} direction={['column', 'row']}>
            {!prof.verified && <Otp verified={prof.verified}/>}
            </Stack>
          </Stack>
        </Flex>
      );
}

export default EditProfile