import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AddTaskOutlined, ReplyOutlined, ThumbUpOutlined, ThumbUpAlt, ThumbDownOffAltOutlined, ThumbDownAlt } from "@mui/icons-material";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { dislikeVideo, getChannel, getSingleVideo, likeVideo } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchStart, fetchSuccess, handleDislikeVideo, handleLikeVideo } from "../redux/videoSlice";
import moment from "moment";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  
  const dispatch = useDispatch();
  const videoId = useLocation().pathname.split('/')[2];

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = useState({});

  const handleLike = () => {
    likeVideo(videoId).then((res) => dispatch(handleLikeVideo(res.data)));
  }
  const handleDislike = () => {
    dislikeVideo(videoId).then((res) => dispatch(handleDislikeVideo(res.data)));
  }

  useEffect(() => {
    dispatch(fetchStart);
    getSingleVideo(videoId)
      .then((currentVideo) => {
        getChannel(currentVideo.data.userId)
        .then((channel) => {
          setChannel(channel.data);
        })
        dispatch(fetchSuccess(currentVideo.data));
      })
      .catch((err) => console.log(err));
  },[videoId, dispatch]);


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {moment(currentVideo?.createdAt).fromNow()}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? <ThumbUpAlt /> : <ThumbUpOutlined />} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
            {currentVideo?.dislikes?.includes(currentUser?._id) ? <ThumbDownAlt /> : <ThumbDownOffAltOutlined />} {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        <Comments/>
      </Content>
      {/* <Recommendation>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendation> */}
    </Container>
  );
};

export default Video;
