import { Box, Center, 
  // Flex, 
  Grid, GridItem, Heading,  
 } from '@chakra-ui/react';
import React from 'react';
// import styles from "./ContractorDashboard.module.scss";
import AttendanceChart from './ContractorDashboardComp/AttendanceChart';
import Grid1 from './ContractorDashboardComp/Grid1';
import TopNav from "./ContractorDashboardComp/TopNav";
import MyMap from "../components/MyMap";
import WorkerList from './ContractorDashboardComp/WorkerList';

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
          templateRows={'repeat(1, 1fr)'}
          gap={10}
          >
          <GridItem
            colSpan={2}
            rowSpan={1}
          >
            <Center>
              <Heading fontWeight={'bold'}>Attendance Report</Heading>
            </Center>
            <AttendanceChart />
          </GridItem>
          {/* <GridItem
            colSpan={1}
            rowSpan={1}
          >
            <Center>
              <Heading fontWeight={'bold'}>Appointed Workers</Heading>
            </Center>
            <WorkerList />            
          </GridItem> */}
          <GridItem>
            <Center mb={3}><Heading fontWeight={'bold'}>Project Location</Heading></Center>
            <MyMap lat={19.228825} lng={72.854118} des={'Lodha'} />
          </GridItem>
        </Grid>
      </Box>
      {/* </Flex> */}
    </Box>
  )
}

export default Dashboard