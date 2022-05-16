import { Grid, Flex, Button, Tabs, TabList, Tab } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Topbar = ({ changeView }) => (
  <Flex
    id="admin__tabs"
    position="sticky"
    top={0}
    flexDirection="row"
    w="100%"
    h="42.5px"
    justifyContent="center"
    bg="gray.800"
    zIndex="sticky"
  >
    <Button
      position="absolute"
      top="0"
      left="0"
      w="fit-content"
      colorScheme="messenger"
      variant="ghost"
      leftIcon={<ChevronLeftIcon />}
    >
      <Link to="/">Back to StockHardware</Link>
    </Button>
    <Tabs align="center" variant="enclosed" w="100%">
      <TabList>
        <Tab onClick={() => changeView("users")}>Users</Tab>
        <Tab onClick={() => changeView("gpus")}>GPU</Tab>
        <Tab onClick={() => changeView("cpus")}>CPU</Tab>
      </TabList>
    </Tabs>
  </Flex>
);

const Admin = ({ isAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/");
    navigate("users");
  }, [isAdmin]);

  return (
    <Grid id="admin__panel" templateRows="50px 100%" gap="5rem" h="100vh">
      <Topbar changeView={navigate} />
      <Flex id="admin__view" h="calc(100% - 42.5px - 7rem)" padding="2rem">
        <Outlet />
      </Flex>
    </Grid>
  );
};

export default Admin;
