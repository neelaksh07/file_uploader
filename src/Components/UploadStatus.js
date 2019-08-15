import React from 'react';

export default function UploadingStatus(props){
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
