import React, {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../config";

import ResultCard from "../components/search/ResultCard";

function AllMovies() {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.apiUrl}/movies`);
          console.log(response.data);
          const sortedData = response.data.sort((a, b) => {
            // calculate ratio
            const ratioA = a.like / (a.like + a.dislike);
            const ratioB = b.like / (b.like + b.dislike);
            if (!isNaN(ratioA) && !isNaN(ratioB) && ratioA !== ratioB) {
              return ratioB - ratioA;
            }
            if (a.like !== b.like) {
              return b.like - a.like;
            }
          });
          setData(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    return(
        <div>
            {data && data.map(d => <ResultCard movie={d}/>)}
        </div>
    )
}

export default AllMovies;