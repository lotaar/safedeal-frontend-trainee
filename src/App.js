import { useState } from 'react';
import './App.css';
import Gallery from './Components/Gallery/Gallery';
import Modal from './Components/Modal/Modal';


function App() {
  const [modalActive,setModalActive] = useState(false)
  const [imgId, setImageId] =useState('')
  const handleOpenModal = (isActive) => {
    setModalActive(isActive)
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  }
  return (
    <div className="App">
      <h1>Test APP</h1>
      <Gallery setActive={setModalActive} setId={setImageId}/>
       {modalActive? <Modal active={modalActive} setActive={setModalActive} id={imgId}/> : null}
      {/* <Modal active={modalActive} setActive={setModalActive} id={imgId}/> */}
    </div>
  );
}

export default App;