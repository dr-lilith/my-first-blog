import { useState } from "react";
import { useEffect } from "react";
import styles from './ImageUploader.module.css'

const ImageUploader =( { postData })=> {
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
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };
   return <div className={styles.container}>
        <label htmlFor="myImage">Загрузите фото</label>
        <input
          type="file"
          onChange={onSelectFile}
          id="myImage"
          accept=".jpg, .jpeg, .png"
          style={{visibility: 'hidden'}}
        />
        {selectedFile && <img src={preview} alt='postImg'/>}
      </div>
}

export default ImageUploader;
