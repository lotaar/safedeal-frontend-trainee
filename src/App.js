import { useState } from 'react';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import Modal from './components/Modal/Modal';


function App() {
  const [modalActive,setModalActive] = useState(false)
  const [imgId, setImageId] =useState('')

  return (
    <div className="App">
      <h1>Test APP</h1>
      <Gallery setActive={setModalActive} setId={setImageId}/>
       {modalActive? <Modal active={modalActive} setActive={setModalActive} id={imgId}/> : null}
    </div>
  );
}

export default App;