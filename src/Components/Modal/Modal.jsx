import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import style from "../Modal/Modal.module.css";
import Preloader from "../Preloader/Preloader";

const initialForm = {
  name: "",
  comment: "",
};

let Modal = ({ active, setActive, id }) => {
  let dateFormatter = (timestamp) => {
    let formatedData = new Date(timestamp).toLocaleDateString("en-US");
    return formatedData;
  };

  const [modalContentData, setModalContentData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState(initialForm);

  function handleSubmit(event) {
    let date = new Date()
    event.preventDefault();
    setModalContentData({...modalContentData, comments:[...modalContentData.comments, {id:null, text:formData.comment, date: date}] })
    /* const apiFormData = new FormData()
    apiFormData.append('name', formData.name)
    apiFormData.append('comment', formData.comment) */

    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
      .then((response) => response.json())
      .then((data) => setModalContentData(data))
      .then(() => setIsLoading(false));
  }, [id]);
  console.log(modalContentData);

  const handleChangeField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div onClick={e => (e.currentTarget === e.target) && setActive(false)} className={active ? style.modalActive : style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalContentImage}>
          <img
            src={isLoading ? "Loading" : modalContentData.url}
            alt="Сиськи"
          />
        </div>
        <div className={style.comments}>
          {isLoading
            ? "Loading"
            : modalContentData.comments.map((comment) => {
                return (
                  <div className={style.commentBody}>
                    <p className={style.commentData}>
                      {dateFormatter(comment.date)}
                    </p>
                    <p className={style.commentText}>{comment.text}</p>
                  </div>
                );
              })}
        </div>
        <div className={style.modalContentForm}>
          <form>
            <input
              placeholder="Ваше имя"
              name="name"
              value={formData.name}
              onChange={handleChangeField}
            />
            <input
              placeholder="Ваш комментарий"
              name="comment"
              value={formData.comment}
              onChange={handleChangeField}
            />

            <button onClick={handleSubmit}>Оценить сиськи</button>
          </form>
        </div>
        <button
          className={style.closeButton}
          onClick={() => setActive(false)}
        ></button>
      </div>
    </div>
  );
};

export default Modal;

{
  /* <div className={style.comments}>


<p className={style.commentData}>02.02.03</p>
<p className={style.commentText}>Сиськи хорошие</p> 
                   
               </div> */
}

{
  /* <p className={style.commentData}>02.02.03</p>
<p className={style.commentText}>Сиськи хорошие</p> */
}

{
  /* <div className={active? style.modalActive : style.modal}>
<div className={style.modalContent}>
    <div className={style.modalImage}>

    </div>
    <form className={style.modalForm}>
        <input></input>
        <br/>
        <input></input>
        <br />
        <button>Оставить комментарий</button>
    </form>
    <button onClick={()=> setActive(false)}>×</button>
</div>
</div> */
}
