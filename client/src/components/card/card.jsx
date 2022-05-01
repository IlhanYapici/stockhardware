import { Flex, Stat, StatNumber, StatLabel } from '@chakra-ui/react';

const Card = ({ title, price }) => {
  return (
    <Flex flexDirection="column" w="250px" h="250px">
      <Stat>
        <StatLabel>{title}</StatLabel>
        <StatNumber>${price}</StatNumber>
      </Stat>
    </Flex>
  );
};

export default Card;
