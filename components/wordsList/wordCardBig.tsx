import { IWord } from '@/app/entities/Word';
import WordCardLi from './wordCardLi';
import { BsPen, BsTrash } from 'react-icons/bs';

interface IProps {
  word: IWord
}

export default function WordCardBig({ word }: IProps) {
  
  return (
    <div className='col-6 col-sm-4 col-lg-3 p-2'>
      <div className="card bg-light shadow-sm">
        <div className="card-header px-3 py-2">
          <p className='h3 m-0'>{word.word}</p>
          <p className='h3 m-0 text-secondary'>{word.definitions}</p>
        </div>
        <ul className="list-group list-group-flush px-3 p-2 border-0">
          { word.tags.length ? <WordCardLi arr={word.tags} itemName="Tags"/> : <></> }
          { word.synonyms.length ? <WordCardLi arr={word.synonyms} itemName="Synonyms"/> : <></> }
          { word.antonyms.length ? <WordCardLi arr={word.antonyms} itemName="Antonyms"/> : <></> }
          { word.description.length ? <p className='rounded p-2 my-2 secondary-200'>{ word.description }</p> : <></> }  
        </ul>
        <div className='card-body pt-0 d-flex justify-content-between'>
          <button className="btn btn-outline-secondary align-items-center d-flex ">
            <span className='d-none d-md-inline'>Edit</span> &nbsp;
            <BsPen  />
          </button>       
          <button className="btn btn-outline-danger align-items-center d-flex ">
            <span className='d-none d-md-inline'>Delete</span> &nbsp;
            <BsTrash />
          </button>          
        </div>
        <div className='card-footer'><small>{word.language}</small></div>
      </div>
    </div>
  )
}