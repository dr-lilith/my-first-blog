import { useState } from "react";
import { useEffect } from "react";
import styles from './AvatarUploader.module.css'

const AvatarUploader =({oldAvatar})=> {
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
        <img src={selectedFile? preview:oldAvatar} alt='avatar' />
        <label htmlFor="myImage">Обновить фото</label>
        <input
          type="file"
          onChange={onSelectFile}
          id="myImage"
          accept=".jpg, .jpeg, .png"
          style={{visibility: 'hidden'}}
        />
      </div>
}

export default AvatarUploader;
