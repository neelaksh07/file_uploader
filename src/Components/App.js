import React from 'react';
import './App.css';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';
import firebaseConfig from '../firebase-config';
import UploadingStatus from './UploadStatus'

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class App extends React.Component{

  state = {
    isUploading: false,
    progress:0,
    url:"",
    error: false,
    success: false,
    filesUploadedData:[]
  }

  handleUploadStart = ()=>{
    console.log("upload start");
    this.setState({
      isUploading: true,
      error: false,
      success: false,
    })
  }

  fetchFileData = () =>{
    var fileDocs = [];
    db.collection("files").get().then(snap=>{
      console.log("snap size: "+snap.size);
      for(const fileDoc of snap.docs)
      {
        console.log(fileDoc.data().fileName);
        fileDocs.push(fileDoc.data().fileName);
      }
      console.log("length: "+fileDocs.length);
      this.setState({
        filesUploadedData:fileDocs,
      });
    });
  }

  handleError =(error)=>{
    console.log(error);
    this.setState({
      isUploading: false,
      error: true,
      success: false,
    })
  }

  handleUploadSuccess = (filename) =>{
    console.log("success uploading "+filename);
    this.setState(
      {
        isUploading: false,
        error: false,
        success: true,
      }
    );
    const DateNow = new Date(Date.now());
    firebase.storage().ref("files").child(filename).getDownloadURL().then(url=>{
      console.log("at least called!");
      db.collection("files").add({
        fileName: filename,
        fileUrl : url,
        timestamp: DateNow.getTime()
      }).then(
        console.log(`data ${filename} ${url} ${DateNow.getTime()} saved successfully into database`)
      )
    })
  }

  componentDidMount(){
    this.fetchFileData();
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
      <ul>
        {this.state.filesUploadedData.map((file)=><li>{file}</li>)}
      </ul>
    </div>
    );
  }
}




export default App;
