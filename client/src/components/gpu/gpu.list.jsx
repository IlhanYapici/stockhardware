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

import Sidebar from "./sidebar";

const GpuList = () => {
  const [gpus, setGpus] = useState([]);
  const [error, setError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchGpus = async () => {
      setHasLoaded(false);

      const url = `http://10.0.0.3:5000/gpu`;

      await axios
        .get(url)
        .then((res) => setGpus(res.data))
        .catch((err) => setError(err));
      setHasLoaded(true);
    };

    fetchGpus();
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
      <Grid id="gpu__list" h="100%" gridTemplateColumns="repeat(6, 1fr)">
        {hasLoaded ? (
          gpus.map((gpu) => {
            return (
              <Card
                id={gpu.reference}
                itemId={gpu._id}
                title={gpu.name}
                price={gpu.price}
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

export default GpuList;
