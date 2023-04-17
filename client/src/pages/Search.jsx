import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { fetchSearchVideos } from "../api";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function useQuery(){
  return new URLSearchParams(useLocation().search);
}




const Search = () => {
  const[videos, setVideos] = useState([]);
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
    
    useEffect(() => {
      const fetchVideos = async () => {
        const videos =  await fetchSearchVideos(searchQuery);
        setVideos(videos.data);
      }
      fetchVideos();
    },[searchQuery]);
    
    return (
      <>
      <Container>
        {videos.map((video) => (
          <Card key={video.id} video={video} />
        ))}
      </Container>
    </>
  );
}

export default Search;
