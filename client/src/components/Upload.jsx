import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styled from 'styled-components';
import app from '../firebase';
import { uploadVideo } from '../api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 95%;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000c5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 40%;
  height: 90%;
  padding: 20px;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.text};
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Description = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Upload = ({setOpen}) => {

  const [uploadProgress, setUploadProgress] = useState({videoProgress: 0, imgProgress: 0});
  const [data, setData] = useState({videoUrl: undefined, imgUrl: undefined, title:'', desc:'', tags:[]});
  
  const navigate = useNavigate();


  const handleChange = (e) => {
    if(e.target.name === 'videoUrl' || e.target.name === 'imgUrl'){
      setData({...data, [e.target.name]: e.target.files[0]});
    }else{
      setData({...data, [e.target.name]: e.target.value});
    }
      // setData({...data, tags: [(e.target.value.replaceAll(' ','')).split(',')]});
  }
  

  const uploadFile = (file, urlType) => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        (urlType === "imgUrl") ? setUploadProgress({...uploadProgress, imgProgress: progress}) : setUploadProgress({...uploadProgress, videoProgress: progress}) 
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, 
      (error) => console.log(error), 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setData({...data, [urlType]: downloadURL})
          console.log('data is set');
        });
      }
      );
    } catch (error) {
      console.log('error....',error);
    }

  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await uploadVideo(data);
    setOpen(false);
    if(res.status === 200) navigate(`/video/${res._id}`);
  }

  useEffect(() => {
    data?.videoUrl && uploadFile(data.videoUrl, "videoUrl");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data.videoUrl]);

  useEffect(() => {
    data?.imgUrl && uploadFile(data?.imgUrl, "imgUrl");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data.imgUrl]);


  return (
    <Container>
      <Wrapper>
        <Title>Upload New Video</Title>
        <Close onClick={()=> setOpen(false)} >X</Close>
        <Form> 
          <Label>Video:</Label>
          {
            uploadProgress.videoProgress > 0 ? ("Uploading:" + (Math.round(uploadProgress.videoProgress)) + '%') :
            <Input name='videoUrl' type='file' accept='video/*' onChange={handleChange} />
          }
          <Input name='title' type='text' onChange={handleChange} placeholder='Video Title' />
          <Description name='desc' placeholder='description' rows={8} onChange={handleChange} /> 
          <Input name='tags' type='text' placeholder='Coma separated tags' onChange={handleChange} />
          <Label>Image:</Label>
          {
            uploadProgress.imgProgress > 0 ? ("Uploading:" + (Math.round(uploadProgress.imgProgress)) + '%') :
            <Input name='imgUrl' type='file' accept='image/*' onChange={handleChange} />
          }
          <Button onClick={handleSubmit} type='submit'>Upload</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Upload;
