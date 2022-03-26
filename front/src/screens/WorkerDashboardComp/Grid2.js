// import { Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Button,
    useColorModeValue,
    Stack,
    GridItem,
    Container,
    Grid,
    Heading,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
// import { FiServer } from 'react-icons/fi';
import { AiFillAlert } from "react-icons/ai";
import { GoLocation } from 'react-icons/go';
import React from 'react'


const Grid1 = () => {

    const GridComp = () => (
        <>
            <Container
                py={5}
                maxW={'container.lg'}>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                    }}
                    gap={20}>
                    <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
                        <Heading as={'h2'}>Statistics for Worked <br />Data</Heading>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'4xl'} fontWeight={'bold'}>
                                20 hours
                            </Text>
                            <Box fontSize={'sm'}>
                                Description for the number of hours worked.
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'4xl'} fontWeight={'bold'}>
                                20 days
                            </Text>
                            <Box fontSize={'sm'}>
                                Description for the number of days worked. 
                            </Box>
                        </Flex>
                    </GridItem>                    
                </Grid>
            </Container>
        </>
    )

    return (
        <GridComp />
    )
}

export default Grid1