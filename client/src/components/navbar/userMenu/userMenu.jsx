import { Link } from "react-router-dom";
import {
  useColorMode,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuGroup,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

const UserMenu = ({ isAdmin, firstname, lastname }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const logOut = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  return (
    <Menu closeOnBlur={true} computePositionOnMount={true}>
      <MenuButton>
        {isAdmin ? (
          <Avatar name={firstname + " " + lastname}>
            <AvatarBadge bg="tomato" boxSize="1em" />
          </Avatar>
        ) : (
          <Avatar name={firstname + " " + lastname} />
        )}
      </MenuButton>
      <MenuList zIndex="dropdown" position="relative">
        <MenuGroup
          title={
            isAdmin
              ? firstname + " " + lastname + " (admin)"
              : firstname + " " + lastname
          }
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          {isAdmin ? (
            <MenuItem>
              <Link to="/admin-panel">Admin panel</Link>
            </MenuItem>
          ) : null}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuOptionGroup
            onChange={() => toggleColorMode()}
            defaultValue={colorMode}
            title="Theme"
            type="radio"
          >
            <MenuItemOption value="light">Light</MenuItemOption>
            <MenuItemOption value="dark">Dark</MenuItemOption>
          </MenuOptionGroup>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
