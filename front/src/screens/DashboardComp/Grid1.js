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
    useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
// import { FiServer } from 'react-icons/fi';
import { AiFillAlert } from "react-icons/ai";
import { GoLocation } from 'react-icons/go';
import React from 'react'


const StatsCard = (props) => {
    const { title, stat, icon, size='2xl' } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'bold'} fontSize={'xl'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={size} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    {icon}
                </Box>
            </Flex>
        </Stat>
    );
}

const GridComp = () => (
    <Box
        // maxW="7xl" 
        // mx={'auto'} 
        pt={5}
    // px={{ base: 2, sm: 12, md: 17 }}
    >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
                title={'Attendance'}
                stat={'600/650'}
                icon={<BsPerson size={'3em'} />}
            />
            <StatsCard
                title={'Violations'}
                stat={
                    <>
                        <Text>Today's Violation: 5</Text>
                        <Text>Average Violation's per day: 7</Text>
                    </>
                }
                size={'md'}
                icon={<AiFillAlert size={'3em'} />}
            />
            <StatsCard
                title={'Geo-Location'}
                stat={
                    <>
                        <Text>Lat: </Text>
                        <Text>Long: </Text>
                    </>
                }
                size={'md'}
                icon={<GoLocation size={'3em'} />}
            />
        </SimpleGrid>
    </Box>
)


const Grid1 = () => {
    return (
        <GridComp />
    )
}

export default Grid1