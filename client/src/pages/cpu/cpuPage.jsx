import { Heading, Flex } from '@chakra-ui/react';
import { Component } from 'react';
import Card from '../../components/card/card';
import axios from 'axios';

class CpuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cpu: [],
    };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/cpu/get').then(cpu => {
      this.setState({ cpu: cpu.data });
    });
  }

  render() {
    return (
      <>
        <Flex justifyContent="center">
          <Heading>Here is our list of CPU.</Heading>
        </Flex>
        {this.state.cpu.map(cpu => {
          return (
            <Card key={cpu.reference} title={cpu.name} price={cpu.price} />
          );
        })}
      </>
    );
  }
}

export default CpuPage;
