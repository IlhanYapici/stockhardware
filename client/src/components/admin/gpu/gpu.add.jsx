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
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

import Dock from "../dock/dock";

const AddGpu = () => {
  const toast = useToast();
  const [gpu, setGpu] = useState({
    name: "",
    reference: "",
    brand: "",
    architecture: "",
    node: "",
    bus: "",
    mem_size: "",
    mem_type: "",
    mem_interface: "",
    freq_idle: "",
    freq_boost: "",
    bandwidth: "",
    cuda_cores: "",
    tensor_cores: "",
    rt_cores: "",
    tdp: "",
    price: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const setToast = (title, description, status) => {
    return toast({
      position: "top",
      title,
      description,
      status,
    });
  };

  const seeGPU = (e) => {
    e.preventDefault();
    console.log(gpu);
  };

  const defineGpu = (e, field, pattern = false) => {
    if (pattern) {
      setGpu(
        e.target.validity.valid ? { ...gpu, [field]: e.target.value } : gpu
      );
    }
    setGpu({ ...gpu, [field]: e.target.value });
  };

  const addGPU = async (e) => {
    e.preventDefault();

    if (Object.values(gpu).some((elem) => elem === "")) {
      setError(true);
      setToast("Error", "Please fill all the fields", "error");
      return;
    }

    setError(false);
    setIsLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = "http://10.0.0.3:5000/gpu";

    await axios
      .post(url, gpu, config)
      .then(() => {
        setToast("Success!", "GPU added.", "success");
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        setToast("OOPS!", error, "error");
      });
  };

  return (
    <Flex h="100%" w="100%" flexDirection="column">
      <Heading
        w="100%"
        bgColor="gray.800"
        position="sticky"
        mb="5px"
        top="42.5px"
        zIndex="sticky"
      >
        Add GPU
      </Heading>
      <form>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(8, 1fr)"
          columnGap="6rem"
          p="2rem"
        >
          <FormControl mt={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Ex: RTX 3080 FE"
              onChange={(e) => defineGpu(e, "name")}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Reference</FormLabel>
            <Input
              type="text"
              placeholder="Ex: rtx3080fe"
              onChange={(e) => defineGpu(e, "reference")}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Brand</FormLabel>
            <Select
              onChange={(e) => defineGpu(e, "brand")}
              placeholder="Select brand"
            >
              <option value="NVIDIA">NVIDIA</option>
              <option value="AMD">AMD</option>
              <option value="Intel">Intel</option>
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Architecture</FormLabel>
            <Input
              type="text"
              placeholder="Ex: Ampere"
              onChange={(e) => defineGpu(e, "architecture")}
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Node</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 8"
                onChange={(e) => defineGpu(e, "node", true)}
              />
              <InputRightAddon children="nm" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Bus</FormLabel>
            <Select
              onChange={(e) => defineGpu(e, "bus")}
              placeholder="Select bus"
            >
              <option value="PCIe 1.0">PCIe 1.0</option>
              <option value="PCIe 2.0">PCIe 2.0</option>
              <option value="PCIe 3.0">PCIe 3.0</option>
              <option value="PCIe 4.0">PCIe 4.0</option>
              <option value="PCIe 4.0">PCIe 5.0</option>
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Memory size</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 10"
                onChange={(e) => defineGpu(e, "mem_size", true)}
              />
              <InputRightAddon children="GB" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Memory type</FormLabel>
            <Select
              onChange={(e) => defineGpu(e, "mem_type")}
              placeholder="Select memory type"
            >
              <option value="GDDR2">GDDR2</option>
              <option value="GDDR3">GDDR3</option>
              <option value="GDDR4">GDDR4</option>
              <option value="GDDR5">GDDR5</option>
              <option value="GDDR5X">GDDR5X</option>
              <option value="GDDR6">GDDR6</option>
              <option value="GDDR6X">GDDR6X</option>
            </Select>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Memory interface</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 384"
                onChange={(e) => defineGpu(e, "mem_interface", true)}
              />
              <InputRightAddon children="bit" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Memory clock</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 1260"
                onChange={(e) => defineGpu(e, "freq_idle", true)}
              />
              <InputRightAddon children="MHz" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Memory boost</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 1710"
                onChange={(e) => defineGpu(e, "freq_boost", true)}
              />
              <InputRightAddon children="MHz" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Bandwidth</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 19"
                onChange={(e) => defineGpu(e, "bandwidth", true)}
              />
              <InputRightAddon children="Gbps" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Cuda cores</FormLabel>
            <Input
              type="number"
              pattern="[0-9]*"
              placeholder="Ex: 8960"
              onChange={(e) => defineGpu(e, "cuda_cores", true)}
            />
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tensor cores</FormLabel>
            <Input
              type="number"
              pattern="[0-9]*"
              placeholder="Ex: 280"
              onChange={(e) => defineGpu(e, "tensor_cores", true)}
            />
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>RT cores</FormLabel>
            <Input
              type="number"
              pattern="[0-9]*"
              placeholder="Ex: 70"
              onChange={(e) => defineGpu(e, "rt_cores", true)}
            />
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>TDP</FormLabel>
            <InputGroup>
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 320"
                onChange={(e) => defineGpu(e, "tdp", true)}
              />
              <InputRightAddon children="W" />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <InputLeftAddon children="$" />
              <Input
                type="number"
                pattern="[0-9]*"
                placeholder="Ex: 759"
                onChange={(e) => defineGpu(e, "price", true)}
              />
            </InputGroup>
            <FormHelperText>Integer only.</FormHelperText>
          </FormControl>
        </Grid>
        <Dock
          isLoading={isLoading}
          submit={seeGPU}
          tab="gpu"
          btn={true}
          btnText="add"
        />
      </form>
    </Flex>
  );
};

export default AddGpu;
