import { useState } from "react"
import styled from "@emotion/styled"
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IWord } from "@/app/entities/Word";

interface IProps {
  handleCloseModal: (modalOpen: boolean) => void,
  word: IWord,
  handleCardsChange: () => void 
}

export default function EditModal({ handleCloseModal, word, handleCardsChange }: IProps) {

  const [formData, setFormData] = useState({
    word: word.word,
    definition1: word.definitions[0] ? word.definitions[0] : "", 
    definition2: word.definitions[1] ? word.definitions[1] : "", 
    definition3: word.definitions[2] ? word.definitions[2] : "",
    tag1: word.tags[0] ? word.tags[0] : "", 
    tag2: word.tags[1] ? word.tags[1] : "",  
    tag3: word.tags[2] ? word.tags[2] : "", 
    synonym1: word.synonyms[0] ? word.synonyms[0] : "", 
    synonym2: word.synonyms[1] ? word.synonyms[1] : "", 
    synonym3: word.synonyms[2] ? word.synonyms[2] : "",
    antonym1: word.antonyms[0] ? word.antonyms[0] : "", 
    antonym2: word.antonyms[1] ? word.antonyms[1] : "", 
    antonym3: word.antonyms[2] ? word.antonyms[2] : "",
    description: word.description ? word.description : "",
  })
  const [language, setLanguage] = useState("default") //////////////////////////// this has to be fixed!
  const [status, setStatus] = useState("")

  const router = useRouter()
  const project = router.query.projects

  const { data: sessionData } = useSession();

  const handleInputChange = (event: any) => {
    const { id } = event.target
    const { value } = event.target
    setFormData((prev) => {
      return {
        ...prev,
        [id] : value,
      }
    })
    console.log(formData)
  }

  const closeModal = () => {
    handleCloseModal(false)
  }

  const combineStrings = (str1: string, str2: string, str3: string) => {
    const all: string[] = [] 
    const checkValue = (str: string) => {
      if (str) all.push(str)
    }
    checkValue(str1)
    checkValue(str2)
    checkValue(str3)
    return(all)
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    
    const allDefinitions = combineStrings(formData.definition1, formData.definition2, formData.definition3)
    const allSynonyms = combineStrings(formData.synonym1, formData.synonym2, formData.synonym3)
    const allAntonyms = combineStrings(formData.antonym1, formData.antonym2, formData.antonym3)
    const allTags = combineStrings(formData.tag1, formData.tag2, formData.tag3)

    axios.post("/api/updateWords", { 
      username: word.username,
      project: word.project,
      word: word.word,
      language,
      description: formData.description,
      definitions: allDefinitions,
      synonyms: allSynonyms,
      antonyms: allAntonyms,
      tags: allTags,
    }, { headers: {"Content-Type": "application/json"} })
    .then((res) => {
      console.log(res.data)
      setStatus(res.data.message)
      handleCloseModal(false)
      handleCardsChange()
    })
    .catch((error) => console.log(">>> Error :" + error))
    console.log("Ok!")     
  }

  return (
    <Container>
        <div className="card border-secondary m-2 mx-auto rounded shadow ">
          <div className="card-header px-2">New Word</div>
          <div className="card-body px-3">
            <form className='row justify-content-center' onSubmit={handleFormSubmit}>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="word" className="badge bg-dark">Word:</label>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="word" 
                          value={formData.word}
                          disabled />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="definitions" className="badge bg-secondary">Definitions: (at least one)</label>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="definition1" 
                          onChange={handleInputChange} 
                          placeholder={word.definitions[0] ? word.definitions[0] : "first definition"}
                          required />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="definition2" 
                          onChange={handleInputChange} 
                          placeholder={word.definitions[1] ? word.definitions[1] : "second definition"} 
                          disabled={!Boolean(formData.definition1?.length)} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="definition3" 
                          onChange={handleInputChange} 
                          placeholder={word.definitions[2] ? word.definitions[2] : "third definition"}
                          disabled={!Boolean(formData.definition2?.length)} />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="tag" className="badge bg-warning">Tags:</label>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="tag1" 
                          onChange={handleInputChange} 
                          placeholder={formData.tag1 ? formData.tag1 : "first tag"} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="tag2" 
                          onChange={handleInputChange} 
                          placeholder={formData.tag2 ? formData.tag2 : "second tag"}
                          disabled={!Boolean(formData.tag1?.length)} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="tag3" 
                          onChange={handleInputChange} 
                           placeholder={formData.tag3 ? formData.tag3 : "third tag"}
                           disabled={!Boolean(formData.tag2?.length)}/>
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="synonym" className="badge bg-success">Synonyms:</label>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="synonym1" 
                          onChange={handleInputChange} 
                          placeholder={formData.synonym1 ? formData.synonym1 : "first synonym"} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="synonym2" 
                          onChange={handleInputChange} 
                          disabled={!Boolean(formData.synonym1?.length)} 
                          placeholder={formData.synonym2 ? formData.synonym2 : "second synonym"} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="synonym3" 
                          onChange={handleInputChange} 
                          disabled={!Boolean(formData.synonym2?.length)} 
                          placeholder={formData.synonym3 ? formData.synonym3 : "third synonym"} />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="antonym" className="badge bg-danger">Antonyms:</label>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="antonym1" 
                          onChange={handleInputChange} 
                          placeholder={formData.antonym1 ? formData.antonym1 : "first antonym"} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="antonym2" 
                          onChange={handleInputChange} 
                          disabled={!Boolean(formData.antonym1?.length)} 
                          placeholder={formData.antonym2 ? formData.antonym2 : "second antonym"} />
                  </div>
                  <div>
                    <input type="text" 
                          className="form-control my-1" 
                          id="antonym3" 
                          onChange={handleInputChange} 
                          disabled={!Boolean(formData.antonym2?.length)} 
                          placeholder={formData.antonym3 ? formData.antonym3 : "third antonym"} />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="description" className="badge bg-info">Description:</label>
                  <div>
                    <textarea className="form-control my-1" 
                              id="description" 
                              rows={4} 
                              maxLength={200}
                              onChange={handleInputChange} 
                              placeholder={formData.description ? formData.description : "description"} >
                    </textarea>
                  </div>
                </div>
                {
                    status && 
                    <div className='bg-danger rounded p-1 text-white d-flex justify-content-center'>{status}</div>
                }
                <hr className='my-3 text-white'/>
                <div className="form-group">
                  <div className="align-text-bottom d-flex justify-content-between">
                    <button className="btn btn-outline-danger r-0" onClick={closeModal}>cancel</button>
                    <button type="submit" className="btn btn-secondary r-0">Edit</button>
                  </div>
                </div>            
            </form>
          </div>
        </div>
    </Container>
  )
} 

const Container = styled.div`
  .form-control:focus {
    border-color: #833bec;
    box-shadow: inset 0 1px 1px #fff, 0 0 8px #ab88e0;
  }
  .card {
    max-width: 800px; /* Adjust the value as per your requirement */
  }
`