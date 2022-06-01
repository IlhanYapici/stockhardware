import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const GpuLanding = () => (
  <Flex id="gpu__landing" w="100%" pt="55px">
    <Outlet />
  </Flex>
);

export default GpuLanding;
