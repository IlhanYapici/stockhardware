import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import LoginForm from "../../components/login/loginForm";

const LoginPage = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <LoginForm />
      <Text>
        You don't have an account yet ? <Link to="/signin">Sign in</Link>
      </Text>
    </Flex>
  );
};

export default LoginPage;
