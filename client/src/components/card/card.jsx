import {
  Flex,
  LinkBox,
  LinkOverlay,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Card = ({ itemId, title, price }) => {
  const navigate = useNavigate();

  return (
    <Flex flexDirection="column" w="250px" h="250px" backgroundColor="gray.700">
      <LinkBox>
        <LinkOverlay
          zIndex="1"
          onClick={() => navigate(itemId)}
          _hover={{ cursor: "pointer" }}
        >
          <Stat>
            <StatLabel>{title}</StatLabel>
            <StatNumber>${price}</StatNumber>
          </Stat>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default Card;
