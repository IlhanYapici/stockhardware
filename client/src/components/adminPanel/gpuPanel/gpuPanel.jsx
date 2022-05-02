import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const GpuPanel = () => (
  <Flex id="gpu__panel" w="100%">
    <Outlet />
  </Flex>
);

export default GpuPanel;
