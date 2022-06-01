import { Heading, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <Flex justifyContent="center" pt="55px">
      <Heading>Welcome to StockHardware!</Heading>
      <Outlet />
    </Flex>
  );
};

export default LandingPage;
