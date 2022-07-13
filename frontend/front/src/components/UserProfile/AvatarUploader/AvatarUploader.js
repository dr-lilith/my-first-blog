import { useState } from "react";
import { useEffect } from "react";
import styles from './AvatarUploader.module.css'
import { httpPostForm } from '../../utils/httpClient'

const AvatarUploader =({oldImage, url})=> {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    console.log("onSelectFile!!")
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    let data = new FormData();
    data.append("image", e.target.files[0])
    httpPostForm(url, data, data.name);
  };
   return <div className={styles.container}>
        <img src={selectedFile? preview:oldImage} alt='Upload your image' style={selectedFile ? {} : {visibility: 'hidden'}}/>
        <label htmlFor="myImage">Обновить фото</label>
        <input
          type="file"
          onChange={(e) => onSelectFile(e)}
          id="myImage"
          accept=".jpg, .jpeg, .png"
          style={{visibility: 'hidden'}}
        />
      </div>
}

export default AvatarUploader;
