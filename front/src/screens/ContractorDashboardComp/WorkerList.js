import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';

const WorkerList = () => {

    const data = [
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
        { name: "Jainam", number: 1000111001 },
    ];

    const WorkerComp = () => (
        <div
            style={{ "overflowY": "scroll", "height": "50%" }}
        >

            <Table variant='striped' colorScheme='teal' mt={5} >
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th isNumeric>Phone Number</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, key) => (
                        <Tr key={key} fontSize={'lg'} fontWeight={'medium'} borderRadius={10}>
                            <Td>{item.name}</Td>
                            <Td isNumeric>{item.number}</Td>
                        </Tr>
                    ))}
                </Tbody>
                {/* <Tfoot>
                <Tr>
                    <Th>To convert</Th>                
                    <Th isNumeric>multiply by</Th>
                </Tr>
            </Tfoot> */}
            </Table>
        </div>
    )

    return (
        <>
            <WorkerComp />
        </>
    )
}

export default WorkerList