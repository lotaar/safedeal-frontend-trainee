import React, { useEffect, useState } from "react";
import { API_URL, INITIAL_FORM } from "../../utils/constants";
import { dateFormatter } from "../../utils/helpers";

import style from "../Modal/Modal.module.css";




let Modal = ({ active, setActive, id }) => {

  const [modalContentData, setModalContentData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState(INITIAL_FORM);

  const closeModal = (e) => {
    (e.currentTarget === e.target) 
    && setActive(false)
  }

  function handleSubmit(event) {
    let date = new Date()
    event.preventDefault();
    


    fetch(`${API_URL}/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(setModalContentData({...modalContentData, comments:
        [...modalContentData.comments, {id:null, text:formData.comment, date: date}] }));
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setModalContentData(data))
      .then(() => setIsLoading(false));
  }, [id]);
  

  const handleChangeField = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div onClick={ e => closeModal(e)} className={active ? style.modalActive : style.modal}>
      <div className={style.modalContent}>
        <div className={style.modalContentImage}>
        {isLoading ?  "Loading" : <img src={ modalContentData.url}
          alt='Gallery item'
        />}
        </div>
        <div className={style.comments}>
          {isLoading
            ? "Loading"
            : modalContentData.comments.map((comment) => {
                return (
                  <div key={comment.id} className={style.commentBody}>
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

            <button onClick={handleSubmit}>Оставить комментарий</button>
          </form>
        </div>
        <button
          className={style.closeButton}
          onClick={() => setActive(false)}
        />
      </div>
    </div>
  );
};

export default Modal;
