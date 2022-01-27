import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import style from '../Modal/Modal.module.css'
import Preloader from "../Preloader/Preloader";
let Modal = ({active, setActive, id}) => {

    const [modalContentData, setModalContentData] = useState('')
    const [isLoading, setIsLoading] =useState(true)
     
    useEffect(() => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
          .then((response) => response.json())
          .then((data) => setModalContentData(data))
          .then(()=>setIsLoading(false))
      }, [id]);
      console.log(modalContentData);
    return (
        <div className={active? style.modalActive : style.modal}>
            <div className={style.modalContent}>
                <div className={style.imageWithForm}>
                    <img src={isLoading? "Loading": modalContentData.url} alt="Сиськи"/>
                    <form>
                        <input placeholder="Ваше имя"></input>
                        <br/>
                        <input placeholder="Ваш комментарий"></input>
                        <br/>
                        <button>Оценить Сиськи</button>
                    </form>
                </div>
                {isLoading? "Loading" : modalContentData.comments.map((comment) => {
                   return(
                       <div>
                           <p>{comment.date}</p>
                           <p>{comment.text}</p>
                       </div>
                   )
                })}
                <button className={style.closeButton} onClick={()=> setActive(false)}>×</button>
            </div>
        </div>
    )
}

export default Modal

{/* <div className={style.comments}>


<p className={style.commentData}>02.02.03</p>
<p className={style.commentText}>Сиськи хорошие</p> 
                   
               </div> */}

{/* <p className={style.commentData}>02.02.03</p>
<p className={style.commentText}>Сиськи хорошие</p> */}

{/* <div className={active? style.modalActive : style.modal}>
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
</div> */}