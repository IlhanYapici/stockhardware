import {
  Grid,
  Spinner,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Card from "../card/card";
import axios from "axios";

//import Sidebar from "./sidebar";

const CpuList = () => {
  const [cpus, setCpus] = useState([]);
  const [error, setError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchCpus = async () => {
      setHasLoaded(false);

      const url = `http://10.0.0.3:5000/cpu`;

      await axios
        .get(url)
        .then((res) => setCpus(res.data))
        .catch((err) => setError(err));
      setHasLoaded(true);
    };

    fetchCpus();
  }, []);

  return (
    <Grid gridTemplateColumns="auto auto">
      <Sidebar width="200px">
        <RangeSlider defaultValue={[0, 1000]} min={0} max={1000} step={25}>
          <RangeSliderTrack bg="linkedin.100">
            <RangeSliderFilledTrack bg="linkedin.300" />
          </RangeSliderTrack>
          <RangeSliderThumb boxSize={5} index={0} />
          <RangeSliderThumb boxSize={5} index={1} />
        </RangeSlider>
      </Sidebar>
      <Grid id="cpu__list" h="100%" gridTemplateColumns="repeat(6, 1fr)">
        {hasLoaded ? (
          Cpus.map((cpu) => {
            return (
              <Card
                id={cpu.reference}
                itemId={cpu._id}
                title={cpu.name}
                price={cpu.price}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </Grid>
    </Grid>
  );
};

export default CpuList;
