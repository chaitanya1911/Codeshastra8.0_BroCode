import { Box, Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
import styles from "./Dashboard.module.scss";
import AttendanceChart from './DashboardComp/AttendanceChart';
import Grid1 from './DashboardComp/Grid1';
import TopNav from "./DashboardComp/TopNav";
import MyMap from "../components/MyMap";

const Dashboard = () => {
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
            <MyMap />
          </GridItem>
        </Grid>
      </Box>
      {/* </Flex> */}
    </Box>
  )
}

export default Dashboard