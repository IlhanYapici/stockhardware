import { Heading, Flex } from '@chakra-ui/react';
import { Component } from 'react';
import Card from '../../components/card/card';
import axios from 'axios';

class GpuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gpu: [],
    };
  }
  componentDidMount() {
    axios.get('http://10.0.0.3:5000/gpu').then(gpu => {
      this.setState({ gpu: gpu.data });
    });
  }

  render() {
    return (
      <>
        <Flex justifyContent="center">
          <Heading>Here is our list of GPU.</Heading>
        </Flex>
        {this.state.gpu.map(gpu => {
          return (
            <Card key={gpu.reference} title={gpu.name} price={gpu.price} />
          );
        })}
      </>
    );
  }
}

export default GpuPage;
