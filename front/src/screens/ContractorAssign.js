import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import axiosInstance from "../axios";

const ContractorAssign = () => {
  const [free, setFree] = useState([]);

  const [busy, setBusy] = useState([]);

  useEffect(() => {
    const data = async () =>
      await axiosInstance
        .get(`api/getprojworkers/${localStorage.getItem("wid")}`)
        .then((res) => {
          console.log(res.data);
          setBusy(res.data.workers);
          setFree(res.data.free);
        })
        .catch((e) => console.log(e));
    data();
  }, []);
  const FreeComp = () => (
    <div style={{ overflowY: "scroll", height: "60vh" }}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Assign them work to maintain a balance</TableCaption>
        <Thead>
          <Tr>
            <Th>Move</Th>
            <Th>Email</Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {free.map((item, key) => (
            <Tr
              key={key}
              onClick={() => {
                const add = async()=>await axiosInstance.post('api/assignworker',{
                    data:{
                        cid:localStorage.getItem("wid"),
                        wid:item.id
                    }
                })
                .then(res=>{
                    setBusy([...busy,free[key]]);
                free.splice(key, 1);
                setFree(free);
                window.location.reload()
                })
                .catch(e=>console.log(e))
                add()
              }}
            >
              <Td>
                <BsFillArrowLeftCircleFill />
              </Td>
              <Td>{item.email}</Td>
              <Td>{item.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );

  const BusyComp = () => (
    <div style={{ overflowY: "scroll", height: "60vh" }}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Free them to maintain a balance</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            {/* <Th>Free Them</Th>             */}
          </Tr>
        </Thead>
        <Tbody>
          {busy.map((item, key) => (
            <Tr key={key}>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td
                onClick={() => {
                  const del = async () =>
                    await axiosInstance
                      .delete(`api/assignworker/${item.id}`)
                      .then((res) =>{
                        setFree([...free,busy[key]]);
                        busy.splice(key, 1);
                        setBusy(busy);
                        window.location.reload()
                      })
                      .catch((e) => console.log(e));
                  del();
                  
                }}
              >
                <BsFillArrowRightCircleFill />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
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
        <Heading fontSize={"6xl"} fontWeight={"bold"}>
          Assign to your location
        </Heading>
      </Center>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2em" }}
      >
        <div>
          <Center my={5}>
            <Heading fontSize={"3xl"} fontWeight={"bold"}>
              Assigned Workers
            </Heading>
          </Center>
          <BusyComp />
        </div>
        <div>
          <Center my={5}>
            <Heading fontSize={"3xl"} fontWeight={"bold"}>
              Free Workers
            </Heading>
          </Center>
          <FreeComp />
        </div>
      </div>
    </>
  );
};

export default ContractorAssign;
