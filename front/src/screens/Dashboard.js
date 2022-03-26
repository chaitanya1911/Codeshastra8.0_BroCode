import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import styles from "./Dashboard.module.scss";
import Grid1 from './DashboardComp/Grid1';
import TopNav from "./DashboardComp/TopNav";

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
        </Box>
      {/* </Flex> */}
    </Box>
  )
}

export default Dashboard