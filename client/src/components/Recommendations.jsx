import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchVideosByTags } from '../api';
import Card from './Card';

const Container = styled.div`
  flex: 2;
  position: sticky;
  top: 56px;
`;

const Recommendations = ({tags}) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
      try {
        const fetch = async () => {
          const res = await fetchVideosByTags(tags);
          setVideos(res.data);
        }
        fetch();
      } catch (error) {
        console.log(error);
      }
    },[tags]);

  return (
    <Container>
      {
        videos.map((video) => (
          <Card key={video._id} video={video} type="sm" /> 
        ))
      }
    </Container>
  );
}

export default Recommendations;
