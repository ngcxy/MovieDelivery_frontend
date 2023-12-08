import React, {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../config";

import ResultCard from "../components/search/ResultCard";
import { Button, Menu, MenuItem } from '@mui/material/';

function AllMovies() {
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.apiUrl}/movies`);
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
            return a.dislike - b.dislike;
          });
          setData(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSort, setSelectedSort] = useState("popular");

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (sortOption) => {
    setAnchorEl(null);
    if (sortOption) {
      setSelectedSort(sortOption);
      if (sortOption === "new") {
          const sortedData = data.sort((a, b) => {
          const createTimeA = new Date(a.create_time);
            const createTimeB = new Date(b.create_time);
            if (createTimeA !== createTimeB) {return createTimeB - createTimeA;}
            const yearA = a.year;
            const yearB = b.year;
            if (yearA !== yearB) {return yearB - yearA;}
            const dateA = a.primary_release_date ? new Date(a.primary_release_date) : 0;
            const dateB = b.primary_release_date ? new Date(b.primary_release_date) : 0;
            if (dateA !== dateB) {return dateB - dateA;}

            return a.title.localeCompare(b.title);
             });
          setData(sortedData);
      } else if (sortOption === "popular") {
          const sortedData = data.sort((a, b) => {
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
      }
    }
  };


    return(
        <div>
            <Button variant="contained" style={{marginTop: "20px", backgroundColor: '#006d77'}} onClick={handleSortClick}>
              Sort: {selectedSort}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleSortClose()}
            >
              <MenuItem onClick={() => handleSortClose('new')}>New</MenuItem>
              <MenuItem onClick={() => handleSortClose('popular')}>Popular</MenuItem>
            </Menu>
            {data && data.map(d => <ResultCard movie={d}/>)}
        </div>
    )
}

export default AllMovies;