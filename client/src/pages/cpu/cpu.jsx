import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const CpuLanding = () => (
  <Flex id="cpu__landing" w="100%" pt="55px">
    <Outlet />
  </Flex>
);

export default CpuLanding;
