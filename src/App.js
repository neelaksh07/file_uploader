import React from 'react';
import './App.css';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from './firebase-config';

firebase.initializeApp(firebaseConfig);

class App extends React.Component{

  state = {
    isUploading: false,
    progress:0,
    url:"",
    error: false,
    success: false,
  }

  handleUploadStart = ()=>{
    console.log("upload start");
    this.setState({
      isUploading: true,
      error: false,
      success: false,
    })
  }

  handleError =(error)=>{
    console.log(error);
    this.setState({
      isUploading: false,
      error: true,
      success: false,
    })
  }

  handleUploadSuccess = () =>{
    console.log("success");
    this.setState(
      {
        isUploading: false,
        error: false,
        success: true,
      }
    )
  }

  handleOnProgress = progress =>{
    console.log(progress);
    this.setState(
      {
        progress: progress,
      }
    );
  }

  render(){
    return(
      <div>
      <h1>Hii this is a demo file uploader</h1>
      <FileUploader
       storageRef = {firebase.storage().ref("files")}
       onUploadStart = {this.handleUploadStart} 
       onUploadError = {this.handleError}
       onUploadSuccess = {this.handleUploadSuccess}
       onProgress = {this.handleOnProgress}
      />
      <UploadingStatus isUploading = {this.state.isUploading} error = {this.state.error} success = {this.state.success} progress = {this.state.progress}/>
    </div>
    );
  }
}

function UploadingStatus(props){
  console.log(props.progress);
  if(props.isUploading===true && props.error===false && props.success===false )
  {
    return(
      <div>
        <p>Uploading....{props.progress}</p>
        </div>
    );
  }
  else if(props.error===true && props.isUploading===false && props.success===false){
    return(<p>Error uploading file..</p>);
  }
  else if(props.error===false && props.isUploading===false && props.success===true)
  {
    return(<p>Success..</p>);
  }
  else{
  return("");
  }
}


export default App;
