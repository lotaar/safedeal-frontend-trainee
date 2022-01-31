import React, { useEffect, useState } from "react";
import styles from '../Gallery/Gallery.module.css'

let Gallery = (props) => {
  const [data, setData] = useState([]);
 let url= `https://boiling-refuge-66454.herokuapp.com/images`

  let onClickSetData = (id)=> {
    props.setActive(true)
    props.setId(id)
  }
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .then((data) => setData(data));
  }, [url]);
 

  return (
    <div className="galleryWrapper">
      <div className={styles.photoWrapper}>
        {data.map((p, index) => {
          return <img key={index} src={p.url} alt="" className={styles.image} onClick={ () =>onClickSetData(p.id)} />;
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
