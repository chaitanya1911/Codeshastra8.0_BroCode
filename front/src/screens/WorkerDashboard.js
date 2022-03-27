import { Box, Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
// import styles from "./WorkerDashboard.module.scss";
import AttendanceChart from './WorkerDashboardComp/AttendanceChart';
import Grid1 from './WorkerDashboardComp/Grid1';
import Grid2 from './WorkerDashboardComp/Grid2';
import TopNav from "./WorkerDashboardComp/TopNav";
import MyMap from "../components/MyMap";

const WorkerDashboard = () => {
  return (
    <Box m={'10'}>
      {/* <Flex> */}
      <Box mt={'5'}>
        <TopNav />
      </Box>
      <Box mt={'10'}>
        <Grid1 />
      </Box>
      <Box mt={'10'}>
        <Grid
          templateColumns={'repeat(3, 1fr)'}
          templateRows={'repeat(1, 1fr)'}>
          <GridItem colSpan={2} rowSpan={1}>
            <Center>
              <Heading fontWeight={'bold'}>Attendance Report</Heading>
            </Center>
            <AttendanceChart />
          </GridItem>
          <GridItem>
            <Center mb={3}><Heading fontWeight={'bold'}>Project Location</Heading></Center>
            <MyMap lat={28.598316} lng={83.931061} des={'Kajaria'} />
          </GridItem>
        </Grid>
      </Box>
      <Box mt={'10'}>
        <Grid2 />
      </Box>
      {/* </Flex> */}
    </Box>
  )
}

export default WorkerDashboard