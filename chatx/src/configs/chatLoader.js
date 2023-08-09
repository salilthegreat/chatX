import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ChatLoader() {
  return (
    <Box sx={{ width: "100%"}}>
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
      <Skeleton animation="wave" height={"80px"} />
    </Box>
  );
}