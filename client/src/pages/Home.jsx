import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { fetchVideos } from "../api";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [videos, setVideos] = useState([]);

  // console.log(videos);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await fetchVideos(type);
        setVideos(res.data);
      }
      fetch();
    } catch (error) {
      console.log(error);
    }
  },[type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
