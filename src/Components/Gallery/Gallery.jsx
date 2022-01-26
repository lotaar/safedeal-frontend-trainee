import React, { useEffect, useState } from "react";
import styles from '../Gallery/Gallery.module.css'
let Gallery = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://boiling-refuge-66454.herokuapp.com/images`)
      .then((response) => response.json())
      .then((data) => data)
      .then((data) => setData(data));
  }, []);
  console.log(data);

  return (
    <div>
      <div className={styles.photoWrapper}>
        {data.map((p) => {
          return <img src={p.url} alt="" className={styles.image} />;
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
