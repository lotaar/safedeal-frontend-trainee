import React, { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import styles from '../Gallery/Gallery.module.css'

const Gallery = (props) => {
  const [imageList, setImageList] = useState([]);
  

  const onClickSetImageList = (id)=> {
    props.setActive(true)
    props.setId(id)
  }
  useEffect(() => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => data)
      .then((data) => setImageList(data));
  }, []);
 
if(!imageList.length) {
  return <h1>Loading data, please wait</h1>
}

  return (
    <div>
      <div className={styles.photoWrapper}>
        {imageList.map((photo) => {
          return <img key={photo.id} src={photo.url} alt="" 
          className={styles.image} onClick={ () =>onClickSetImageList(photo.id)} />;
        })}
      </div>
      <div className={styles.separator}></div>
      <footer>
        <div className={styles.footerText}>
        © 2018-2019
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
