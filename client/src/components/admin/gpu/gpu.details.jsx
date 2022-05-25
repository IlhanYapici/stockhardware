import {
  Grid,
  Flex,
  Heading,
  Skeleton,
  HStack,
  Badge,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Dock from "../dock/dock";

const GpuDetails = () => {
  const { gpuId } = useParams();
  const [gpu, setGpu] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const getGPU = async () => {
      setHasFetched(false);

      const { user } = JSON.parse(localStorage.getItem("userInfo"));
      const bearer = `Bearer ${user}`;

      const url = `http://10.0.0.3:5000/gpu/${gpuId}`;

      await axios
        .get(url, {
          headers: { Authorization: bearer },
        })
        .then((res) => {
          setGpu(res.data);
          setHasFetched(true);
        })
        .catch((err) => {
          console.error(err);
          setHasFetched(false);
        });
    };

    if (localStorage.getItem("userInfo")) {
      getGPU();
    }
  }, []);

  const capitalize = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
      <Flex id="gpu__details" h="100%" w="100%" flexDirection="column">
        <Skeleton isLoaded={hasFetched}>
          <HStack>
            <Heading>{gpu.name}</Heading>
            <Badge
              textAlign="center"
              mt="9px !important"
              fontSize="large"
              w="fit-content"
              h="fit-content"
              p="2px 7.5px"
              verticalAlign="middle"
              colorScheme={
                gpu.brand === "AMD"
                  ? "red"
                  : gpu.brand === "NVIDIA"
                  ? "green"
                  : "linkedin"
              }
            >
              {gpu.brand}
            </Badge>
          </HStack>
          <Divider w="100%" mt="5px" />
        </Skeleton>
        <Grid>
          {Object.entries(gpu).map(([key, value]) => {
            if (key === "brand" || key === "__v") return null;
            return (
              <Skeleton isLoaded={hasFetched} key={key}>
                <Text>
                  <Text as="i">{capitalize(key)} :</Text> {value}
                </Text>
              </Skeleton>
            );
          })}
        </Grid>
        <Dock tab="gpu" btn={false} />
      </Flex>
    </>
  );
};

export default GpuDetails;
