import { Grid, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";
import axios from "axios";

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
    <Grid id="gpu__list" w="100%" h="100%" gridTemplateColumns="repeat(6, 1fr)">
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
  );
};

export default GpuList;
