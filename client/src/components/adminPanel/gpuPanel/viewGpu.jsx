import { Flex, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "../searchBar/searchBar";
import ItemCard from "../itemCard";

const ViewGpu = () => {
  const [gpus, setGpus] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchGpus = async () => {
      setHasLoaded(false);
      const { user } = JSON.parse(localStorage.getItem("userInfo"));
      const bearer = `Bearer ${user}`;
      const url = "http://10.0.0.3:5000/gpu";

      await axios
        .get(url, {
          headers: { Authorization: bearer },
        })
        .then((res) => {
          setGpus(res.data);
          setHasLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setHasLoaded(false);
        });
    };
    fetchGpus();
  }, []);

  const filteredData = gpus.filter((gpu) => {
    if (input === "") return gpu;
    return gpu.name.includes(input.toLowerCase());
  });

  return (
    <Flex flexDirection="column" w="100%" h="100%">
      <SearchBar setInput={setInput} target="gpu" marginBottom="2rem" />
      <Grid
        id="gpu__grid"
        gap="2rem"
        templateColumns="repeat(2, 1fr)"
        autoRows="180px"
      >
        {filteredData.map((gpu, i) => (
          <ItemCard
            hasLoaded={hasLoaded}
            item={gpu}
            key={"u" + i}
            parentKey={"u" + i}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default ViewGpu;
