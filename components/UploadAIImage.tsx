"use client"

import { useState } from 'react';

import React from 'react'
import { Button } from './ui/button';

function UploadAIImage() {
  const [file, setFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileChange = (e: any) => {
    console.log("e", e.target.files[0])
    const file = e.target.files[0]
    const fileSize = file.size; // size in bytes
    const fileSizeInKB = fileSize / 1024; // size in kilobytes
    const fileSizeInMB = fileSizeInKB / 1024; // size in megabytes

    console.log('File size:', fileSize, 'bytes');
    console.log('File size:', fileSizeInKB.toFixed(2), 'KB');
    console.log('File size:', fileSizeInMB.toFixed(2), 'MB');
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    console.log("formData", formData)
    try {
      const response = await fetch(
        'http://localhost:3002/dall-e/generate-image-by-upload',
        {
          method: 'POST',
          body: formData,
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // }
        }
      );

      const data = await response.json();
      console.log("data", data);
      // var base64String = data.processedImage;
      // var img = new Image();

      // // Set the src attribute with the base64 string
      // img.src = 'data:image/png;base64,' + base64String;
      // console.log("img", img)
      // setProcessedImage(data.processedImage);
      // const test = `data:image/png;base64,${data.processedImage}`
      // console.log(test);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div
      className='absolute top-[180px] left-full ml-3 bg-[#F5F5F5] w-[300px] h-[200px] rounded-md p-3'
    >
      <div className='flex flex-col justify-start gap-3'>
        <div className="flex-1 flex-col ">
          <input
            id='file-upload'
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="filepicker-label">
            Upload File haha
          </label>
        </div>
        {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}

        <Button onClick={handleSubmit}>Process Image</Button>

        {/* {processedImage && <img src={`data:image/png;base64,${processedImage}`} alt="Processed Image" />} */}
      </div>
    </div>
  )
}

export default UploadAIImage