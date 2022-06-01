import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CpuPage = () => {
  const { cpuId } = useParams();
  return <Heading>{cpuId}</Heading>;
};

export default CpuPage;
