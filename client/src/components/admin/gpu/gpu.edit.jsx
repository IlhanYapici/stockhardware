import {
  useToast,
  Flex,
  Grid,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Dock from "../dock/dock";

const EditGpu = () => {
  const toast = useToast();
  const { gpuId } = useParams();
  const [gpu, setGpu] = useState({});
  const [newGpu, setNewGpu] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const defineGpu = (e, field, pattern = false) => {
    if (pattern) {
      setNewGpu(
        e.target.validity.valid ? { ...newGpu, [field]: e.target.value } : gpu
      );
    }
    setNewGpu({ ...newGpu, [field]: e.target.value });
  };

  const setToast = (title, description, status) => {
    return toast({
      title,
      description,
      status,
      duration: 2500,
    });
  };

  const updateGpu = async (e) => {
    e.preventDefault();

    setError(false);
    setIsLoading(true);

    const { user } = JSON.parse(localStorage.getItem("userInfo"));
    const bearer = `Bearer ${user}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    };

    const url = `http://10.0.0.3:5000/gpu/${gpuId}`;

    await axios
      .put(url, newGpu, config)
      .then(() => {
        setToast("Success!", "GPU updated successfully.", "success");
      })
      .catch((err) => {
        setError(err);
        setToast("Error", error, "error");
      });

    setIsLoading(false);
  };

  useEffect(() => {
    const getGpu = async () => {
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
          setNewGpu(res.data);
          setHasFetched(true);
        })
        .catch((err) => {
          console.error(err);
          setHasFetched(false);
          setError(err.message);
          setToast("Error!", error, "error");
        });
    };

    if (localStorage.getItem("userInfo")) {
      getGpu();
    }
  }, []);

  return (
    <Flex id="gpu__edit" h="100%" w="100%" flexDirection="column">
      <Skeleton isLoaded={hasFetched}>
        <Heading
          w="100%"
          bgColor="gray.800"
          position="sticky"
          mb="5px"
          top="42.5px"
          zIndex="sticky"
        >
          {`${gpu.name} (${gpu._id})`}
        </Heading>
      </Skeleton>
      <form>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(8, 1fr)"
          columnGap="6rem"
          p="2rem"
        >
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="text"
                placeholder={gpu.name}
                onChange={(e) => defineGpu(e, "name")}
              />
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Reference</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="text"
                placeholder={gpu.reference}
                onChange={(e) => defineGpu(e, "reference")}
              />
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Brand</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Select
                onChange={(e) => defineGpu(e, "brand")}
                placeholder={gpu.brand}
              >
                <option value="NVIDIA">NVIDIA</option>
                <option value="AMD">AMD</option>
                <option value="Intel">Intel</option>
              </Select>
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Architecture</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="text"
                placeholder={gpu.architecture}
                onChange={(e) => defineGpu(e, "architecture")}
              />
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Node</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.node}
                  onChange={(e) => defineGpu(e, "node", true)}
                />
                <InputRightAddon children="nm" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Bus</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Select
                onChange={(e) => defineGpu(e, "bus")}
                placeholder={gpu.bus}
              >
                <option value="PCIe 1.0">PCIe 1.0</option>
                <option value="PCIe 2.0">PCIe 2.0</option>
                <option value="PCIe 3.0">PCIe 3.0</option>
                <option value="PCIe 4.0">PCIe 4.0</option>
                <option value="PCIe 5.0">PCIe 5.0</option>
              </Select>
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Memory size</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.mem_size}
                  onChange={(e) => defineGpu(e, "mem_size", true)}
                />
                <InputRightAddon children="GB" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Memory type</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Select
                onChange={(e) => defineGpu(e, "mem_type")}
                placeholder={gpu.mem_type}
              >
                <option value="GDDR2">GDDR2</option>
                <option value="GDDR3">GDDR3</option>
                <option value="GDDR4">GDDR4</option>
                <option value="GDDR5">GDDR5</option>
                <option value="GDDR5X">GDDR5X</option>
                <option value="GDDR6">GDDR6</option>
                <option value="GDDR6X">GDDR6X</option>
              </Select>
            </Skeleton>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Memory interface</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.mem_interface}
                  onChange={(e) => defineGpu(e, "mem_interface", true)}
                />
                <InputRightAddon children="bit" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Memory clock</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.freq_idle}
                  onChange={(e) => defineGpu(e, "freq_idle", true)}
                />
                <InputRightAddon children="MHz" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Memory boost</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.freq_boost}
                  onChange={(e) => defineGpu(e, "freq_boost", true)}
                />
                <InputRightAddon children="MHz" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Bandwidth</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.bandwidth}
                  onChange={(e) => defineGpu(e, "bandwidth", true)}
                />
                <InputRightAddon children="Gbps" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Cuda cores</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder={gpu.cuda_cores}
                onChange={(e) => defineGpu(e, "cuda_cores", true)}
              />
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tensor cores</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder={gpu.tensor_cores}
                onChange={(e) => defineGpu(e, "tensor_cores", true)}
              />
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>RT cores</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder={gpu.rt_cores}
                onChange={(e) => defineGpu(e, "rt_cores", true)}
              />
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>TDP</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.tdp}
                  onChange={(e) => defineGpu(e, "tdp", true)}
                />
                <InputRightAddon children="W" />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Skeleton isLoaded={hasFetched}>
              <InputGroup>
                <InputLeftAddon children="$" />
                <Input
                  type="number"
                  pattern="[0-9]*"
                  placeholder={gpu.price}
                  onChange={(e) => defineGpu(e, "price", true)}
                />
              </InputGroup>
            </Skeleton>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>
        </Grid>
        <Dock
          isLoading={isLoading}
          submit={updateGpu}
          tab="gpu"
          btn={true}
          btnText="save"
        />
      </form>
    </Flex>
  );
};

export default EditGpu;
