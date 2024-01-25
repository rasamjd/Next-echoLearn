import { useState } from 'react';
import { IWord } from '@/app/entities/Word';
import WordCardLi from './wordCardLi';
import { BsPen, BsTrash } from 'react-icons/bs';
import { OverlayTrigger, Popover } from "react-bootstrap";
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import EditModal from './editModal';

interface IProps {
  word: IWord
}

export default function WordCardSmall({ word }: IProps) {

  const [modalOpen, setModalOpen] = useState(false);
  
  const router = useRouter()

  const handleWordDeletion = () => {

    axios.post("/api/deleteWords", { 
      username: word.username,
      project: word.project,
      word: word.word
    }, { headers: {"Content-Type": "application/json"} })
    .then((res) => {
      console.log(res.data)
      router.reload()
    })
    .catch((error) => console.log(">>> Error :" + error))
    console.log("Ok!")     
  }

  const PopoverContent = () => (
    <div className="card bg-light shadow-sm m-0 border-0">
      <div className="card-header px-3 pb-2">
       <p className='h3 m-0 text-secondary display-6 p-0'>{word.definitions[0]}</p>
     </div>
      <ul className="list-group list-group-flush px-3 p-2 border-0">
        { word.definitions?.length > 1 ? <WordCardLi arr={word.definitions} itemName="Definitions"/> : <></> }
        { word.tags.length ? <WordCardLi arr={word.tags} itemName="Tags"/> : <></> }
        { word.synonyms.length ? <WordCardLi arr={word.synonyms} itemName="Synonyms"/> : <></> }
        { word.antonyms.length ? <WordCardLi arr={word.antonyms} itemName="Antonyms"/> : <></> }
        { word.description?.length ? <p className='rounded p-2 my-2 secondary-200 bg-gray'>{ word.description }</p> : <></> }  
      </ul>
      {/* <div className='card-body pt-0 d-flex justify-content-between'>
        <button className="btn btn-outline-secondary align-items-center d-flex" onClick={() => setModalOpen(true)}>
          <span className='d-none d-sm-inline'>Edit</span> &nbsp;
          <BsPen  />
        </button>       
        <span className='m-2'/>
        <button className="btn btn-outline-danger align-items-center d-flex" onClick={handleWordDeletion}>
          <span className='d-none d-sm-inline'>Delete</span> &nbsp;
          <BsTrash />
        </button>       
      </div> */}
      <div className='card-footer'><small>{word.language}</small></div>
    </div>
  );

  return (
    <div className='col-6 col-sm-4 col-lg-3 p-2'>
      <div className="card bg-light border-secondary shadow-sm rounded-3">
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id="popover-basic">
                <PopoverContent />
            </Popover>
          }
        >
          <button className='p-1 border-0 rounded-3 bg-light text-secondary'>
          <p className='h3 m-0'>{word.word}</p>

          </button>
        </OverlayTrigger>
      </div>
    </div>
  );
}