import { Flex, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "../searchBar/searchBar";
import ItemCard from "../cards/card";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");

    const fetchUsers = async () => {
      setHasLoaded(false);
      const { user } = JSON.parse(localStorage.getItem("userInfo"));
      const bearer = `Bearer ${user}`;
      const url = "http://10.0.0.3:5000/users";

      await axios
        .get(url, {
          headers: { Authorization: bearer },
        })
        .then((res) => {
          setUsers(res.data);
          setHasLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setHasLoaded(false);
        });
    };
    fetchUsers();
  }, []);

  const filteredData = users.filter((user) => {
    if (input === "") return user;
    return (
      user.firstname.toLowerCase() +
      " " +
      user.lastname.toLowerCase()
    ).includes(input.toLowerCase());
  });

  return (
    <Flex flexDirection="column" w="100%" h="100%">
      <SearchBar setInput={setInput} target="user" marginBottom="2rem" />
      <Grid
        id="user__grid"
        gap="2rem"
        templateColumns="repeat(2, 1fr)"
        autoRows="180px"
      >
        {filteredData.map((user, i) => (
          <ItemCard
            key={"u" + i}
            type="user"
            hasLoaded={hasLoaded}
            data={user}
            parentKey={"u" + i}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default ViewUsers;
