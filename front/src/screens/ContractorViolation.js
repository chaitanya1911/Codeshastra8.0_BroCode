import React from 'react';
import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Text,
    Center,
    HStack,
    SimpleGrid,
    Wrap,
    WrapItem,
    Grid,
    GridItem
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';


const ContractorViolation = () => {



    const Comp = ({url = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80"}) => {
        const data = {
            imageURL:
                url,
        };

        return (

            <Flex p={50} w="full">
                <Box
                    bg={useColorModeValue('white', 'gray.800')}
                    maxW="sm"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="lg"
                    position="relative">
                    {data.isNew && (
                        <Circle
                            size="10px"
                            position="absolute"
                            top={2}
                            right={2}
                            bg="red.200"
                        />
                    )}

                    <Image
                        src={data.imageURL}
                        alt={`Picture of ${data.name}`}
                        roundedTop="lg"
                    />

                    <Center>
                        <Text href={'#'} display={'flex'} fontSize={'xl'}>
                            Date: xyz
                        </Text>
                    </Center>
                </Box>
            </Flex>
        )
    }



    return (
        <Grid templateColumns={'repeat(3, 1fr)'} my={10} gap={10}>
            <GridItem>
                <Center>
                    <Comp />
                </Center>
            </GridItem>
            <GridItem>
                <Center>
                    <Comp />
                </Center>
            </GridItem>
            <GridItem>
                <Center>
                    <Comp />
                </Center>
            </GridItem>
            <GridItem>
                <Center>
                    <Comp />
                </Center>
            </GridItem>
        </Grid>
    )
}

export default ContractorViolation