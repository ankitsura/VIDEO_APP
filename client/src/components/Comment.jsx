import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { getUser } from "../api";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {

const [commentUser, setCommentUser] = useState({})
const dispatch = useDispatch();


useEffect(() => {
    const fetch = async () =>{
      const res = (await getUser(comment.userId)).data;
      setCommentUser(res);
    }
    fetch();
  },[comment.userId])

  return (
    <Container>
      <Avatar src={commentUser.img} />
      <Details>
        <Name>
          {commentUser.name}  &nbsp;•&nbsp; {moment(comment?.createdAt).fromNow()}
        </Name>
        <Text>
          {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
