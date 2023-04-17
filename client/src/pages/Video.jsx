import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AddTaskOutlined, ReplyOutlined, ThumbUpOutlined, ThumbUpAlt, ThumbDownOffAltOutlined, ThumbDownAlt } from "@mui/icons-material";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { dislikeVideo, getSingleVideo, handleSubscribeChannel, likeVideo } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { handleDislikeVideo, handleLikeVideo } from "../redux/videoSlice";
import moment from "moment";
import Recommendations from "../components/Recommendations";



const Container = styled.div`
::-webkit-scrollbar {
    width: 0px;
  }
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
::-webkit-scrollbar {
    width: 0px;
  }
  flex: 5;
  height: var(100vh-56px);
  overflow-y: scroll;
`;
const VideoWrapper = styled.div`
position: relative;
`;

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
  cursor: context-menu;
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
const VideoFrame = styled.video`
  max-height: 75vh;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  
  const dispatch = useDispatch();
  const videoId = useLocation().pathname.split('/')[2];

  const { currentUser } = useSelector((state) => state.user);
  
  const video = useSelector((state) => state.video.currentVideo?.video);
  const channel = useSelector((state) => state.video.currentVideo?.channel);
  const isSubscribed = (currentUser?.subscribedUsers)?.includes(channel?._id);

  const handleLike = () => {
    likeVideo(videoId).then((res) => dispatch(handleLikeVideo(res.data)));
  }
  const handleDislike = () => {
    dislikeVideo(videoId).then((res) => dispatch(handleDislikeVideo(res.data)));
  }

  const toogleSubscribe = () => {
      dispatch(handleSubscribeChannel(channel._id));
    }

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[videoId]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={video?.videoUrl} poster={video?.imgUrl} type="video/mp4" controls />
        </VideoWrapper>
        <Title>{video?.title}</Title>
        <Details>
          <Info>{(video?.views) ? video.views : 0} views • {moment(video?.createdAt).fromNow()}</Info>
          <Buttons>
            { (currentUser) && 
            ((currentUser?._id !== channel?._id) ?
              <>
                <Button onClick={handleLike}>
                  {video?.likes?.includes(currentUser?._id) ? <ThumbUpAlt /> : <ThumbUpOutlined />} {video?.likes?.length}
                </Button>
                <Button onClick={handleDislike}>
                {video?.dislikes?.includes(currentUser?._id) ? <ThumbDownAlt /> : <ThumbDownOffAltOutlined />} {video?.dislikes?.length}
                </Button>
              </>
              :
              <>
                <Button style={{cursor: 'default'}}>
                  <ThumbUpAlt /> {video?.likes?.length}
                </Button>
                <Button style={{cursor: 'default'}}>
                  <ThumbDownAlt /> {video?.dislikes?.length}
                </Button>
              </>
            )}
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
                {video?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {(!currentUser) ?
            <Subscribe style={{cursor:'unset', backgroundColor: 'grey'}}>SUBSCRIBE</Subscribe>
            :
            (currentUser?._id !== channel?._id) && <Subscribe onClick={toogleSubscribe}>{isSubscribed ? `SUBSCRIBED` : `SUBSCRIBE`}</Subscribe>
          }
        </Channel>
        <Hr />
        <Comments videoId={videoId} currentUser={currentUser} />
      </Content>
      <Recommendations tags={video?.tags}/>
    </Container>
  );
};

export default Video;
