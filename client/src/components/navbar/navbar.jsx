import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Flex, Button } from "@chakra-ui/react";

import UserMenu from "./userMenu/userMenu";
import "./navbar.css";

const Navbar = ({ links, isAdmin, firstname, lastname }) => {
  const [location, setLocation] = useState(window.location.pathname);

  return (
    <>
      <Container centerContent maxW="100%" position="fixed" zIndex="modal">
        <Flex
          id="navbar"
          flexDirection="row"
          justifyContent="space-around"
          h="55px"
          w="90%"
        >
          <Flex
            id="navbar__links"
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            w="150px"
          >
            {links &&
              links.map((link) => {
                return (
                  <Link
                    className="navbar__link"
                    onClick={(e) => setLocation(e.target.pathname)}
                    key={link}
                    to={`/${
                      link.toLowerCase() === "home" ? "" : link.toLowerCase()
                    }`}
                  >
                    {link}
                  </Link>
                );
              })}
          </Flex>
          {localStorage.getItem("userInfo") ? (
            <UserMenu
              isAdmin={isAdmin}
              firstname={firstname}
              lastname={lastname}
            />
          ) : location !== "/login" ? (
            <Button>
              <Link onClick={(e) => setLocation(e.target.pathname)} to="/login">
                Login
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </Flex>
      </Container>
      <Outlet />
    </>
  );
};

export default Navbar;
