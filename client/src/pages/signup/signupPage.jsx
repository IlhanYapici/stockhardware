import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import SignupForm from '../../components/signup/signupForm';

const SignupPage = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <SignupForm />
      <Text>
        You already have an account ? <Link to="/login">Log in</Link>
      </Text>
    </Flex>
  );
};

export default SignupPage;
