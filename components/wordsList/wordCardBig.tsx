import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IWord } from '@/app/entities/Word';
import WordCardLi from './wordCardLi';
import { BsPen, BsTrash } from 'react-icons/bs';
import Modal from 'react-modal';
import EditModal from './editModal';

interface IProps {
  word: IWord,
  handleCardsChange: () => void
}

export default function WordCardBig({ word, handleCardsChange }: IProps) {

  const [modalOpen, setModalOpen] = useState(false)

  const handleWordDeletion = () => {

    axios.post("/api/deleteWords", { 
      username: word.username,
      project: word.project,
      word: word.word
    }, { headers: {"Content-Type": "application/json"} })
    .then((res) => {
      console.log(res.data)
      handleCardsChange()
    })
    .catch((error) => console.log(">>> Error :" + error))
    console.log("Ok!")     
  }
  
  return (
    <div className='col-6 col-sm-4 col-lg-3 p-2'>
      <div className="card bg-light shadow-sm">
        <div className="card-header px-3 py-2">
          <p className='h3 m-0'>{word.word}</p>
          <p className='h3 m-0 text-secondary'>{word.definitions[0]}</p>
        </div>
        <ul className="list-group list-group-flush px-3 p-2 border-0">
          { word.definitions?.length > 1 ? <WordCardLi arr={word.definitions} itemName="Definitions"/> : <></> }
          { word.tags?.length ? <WordCardLi arr={word.tags} itemName="Tags"/> : <></> }
          { word.synonyms?.length ? <WordCardLi arr={word.synonyms} itemName="Synonyms"/> : <></> }
          { word.antonyms?.length ? <WordCardLi arr={word.antonyms} itemName="Antonyms"/> : <></> }
          { word.description?.length ? <p className='rounded p-2 my-2 secondary-200 bg-gray'>{ word.description }</p> : <></> }  
        </ul>
        <div className='card-body pt-0 d-flex justify-content-between'>
          <button className="btn btn-outline-secondary align-items-center d-flex" onClick={() => setModalOpen(true)}>
            <span className='d-none d-md-inline'>Edit</span> &nbsp;
            <BsPen  />
          </button>       
          <button className="btn btn-outline-danger align-items-center d-flex" onClick={handleWordDeletion}>
            <span className='d-none d-md-inline'>Delete</span> &nbsp;
            <BsTrash />
          </button>          
        </div>
        <div className='card-footer'><small>{word.language}</small></div>
      </div>
      <Modal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setModalOpen(false)}
        className="p-0 mx-auto my-5 outline-0"
        style={{
          overlay: {
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            overflowY: "auto"
          },
          content: {
            background: 'transparent',
            overflow: 'inherit',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            width: "fit-content",
          }
        }}
      >
        <EditModal handleCloseModal={setModalOpen} word={word} handleCardsChange={handleCardsChange} />
      </Modal>
    </div>
  )
}