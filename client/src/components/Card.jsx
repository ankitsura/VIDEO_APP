import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
  user-select: none;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {

  const videoCreatorId = video?.userId;
  // const videoId = video?._id;
  const [channel, setChannel] = useState({});

  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const res = await axios.get(`http://localhost:5000/api/users/find/${videoCreatorId}`);
        setChannel(res.data);
      };
      fetchChannel(); 
    } catch (error) {
      console.log(error);
    }
  },[videoCreatorId]);

  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Image
          type={type}
          src={video?.imgUrl}
        />
      </Link>
      <Details type={type}>
        <ChannelImage
          type={type}
          src={channel.img}
          />
        <Texts>
          <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Title>{video.title}</Title>
          </Link>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} views • {moment(video.createdAt).fromNow()}</Info>
        </Texts>
      </Details>
  </Container>
  );
};

export default Card;
