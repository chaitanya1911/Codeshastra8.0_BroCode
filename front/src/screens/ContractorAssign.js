import { Center, Grid, GridItem, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
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
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";

const ContractorAssign = () => {

    const [free, setFree] = useState([
        { name: "Free1", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
        { name: "Free", phone: "11111 00000" },
    ]);

    const [busy, setBusy] = useState([
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
        { name: "Busy", phone: "00000 11111" },
    ]);

    const FreeComp = () => (
        <div style={{"overflowY": "scroll", "height": "60vh"}}>
            <Table variant='striped' colorScheme='teal'>
            <TableCaption>Assign them work to maintain a balance</TableCaption>
            <Thead>
                <Tr>
                    <Th>Move</Th>
                    <Th>Contact</Th>            
                    <Th>Name</Th>
                </Tr>
            </Thead>
            <Tbody>

                {
                    free.map((item, key)=>(
                        <Tr key={key}
                        onClick={()=>{
                            setBusy([...busy, free[key]])
                            free.splice(key, 1);
                            setFree(free);
                        }}
                        >
                            <Td><BsFillArrowLeftCircleFill /></Td>
                            <Td>{item.phone}</Td>
                            <Td>{item.name}</Td>
                        </Tr>
                    ))
                }                
            </Tbody>            
        </Table>
        </div>        
    )

    const BusyComp = () => (
        <div style={{"overflowY": "scroll", "height": "60vh"}}>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Free them to maintain a balance</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Contact</Th>            
                        {/* <Th>Free Them</Th>             */}
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        busy.map((item, key)=>(
                            <Tr key={key}>
                                <Td>{item.name}</Td>
                                <Td>{item.phone}</Td>                    
                                <Td
                                onClick={()=>{
                                    setFree([...free, busy[key]])
                                    busy.splice(key, 1);
                                    setBusy(busy);
                                }}
                                ><BsFillArrowRightCircleFill /></Td>                    
                            </Tr>
                        ))
                    }
                </Tbody>            
            </Table>
        </div>
    )
    // function addtolist(id){
    //     const add = async()=>await axiosInstance.post('api/assignworker',{
    //         data:{
    //             cid:localStorage.getItem("wid"),
    //             wid:id
    //         }
    //     })
    //     .then(res=>{
    //         window.location.reload()
    //     })
    //     .catch(e=>console.log(e))
    //     add()
    // }
    // function delworker(id){
    //     const del = async()=>await axiosInstance.delete(`api/assignworker/${id}`)
    //     .then(res=>{
    //         window.location.reload()
    //     })
    //     .catch(e=>console.log(e))
    //     del()
    // }

    return (
        <>
            <Center my={10}>
                <Heading fontSize={'6xl'} fontWeight={'bold'}>
                    Assign to your location
                </Heading>
            </Center>


            <div style={{ 'display': 'grid', 'gridTemplateColumns': '1fr 1fr', gap: '2em' }}>
                <div>
                    <Center my={5}>
                        <Heading fontSize={'3xl'} fontWeight={'bold'}>
                            Assigned Workers
                        </Heading>
                    </Center>
                    <BusyComp />
                </div>
                <div>
                    <Center my={5}>
                        <Heading fontSize={'3xl'} fontWeight={'bold'}>
                            Free Workers
                        </Heading>
                    </Center>
                    <FreeComp />
                </div>
            </div>
        </>
    )
}

export default ContractorAssign