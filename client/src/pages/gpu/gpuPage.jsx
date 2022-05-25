import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const GpuPage = () => {
  const { gpuId } = useParams();
  return <Heading>{gpuId}</Heading>;
};

export default GpuPage;
