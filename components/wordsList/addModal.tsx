import { useState } from "react"
import { useRouter } from "next/router";
import styled from "@emotion/styled"
import axios from "axios";
import { useSession } from "next-auth/react";

interface IProps {
  handleCloseModal: (modalOpen: boolean) => void,
  handleCardsChange: () => void
}

export default function AddModal({ handleCloseModal, handleCardsChange }: IProps) {

  const [formData, setFormData] = useState({
    word: "",
    definition1: "", definition2: "", definition3: "",
    tag1: "", tag2: "", tag3: "",
    synonym1: "", synonym2: "", synonym3: "",
    antonym1: "", antonym2: "", antonym3: "",
    description: "",
  })
  const [language, setLanguage] = useState("default") //////////////////////////// this has to be fixed!
  const [status, setStatus] = useState("")

  const router = useRouter()
  const project = router.query.project

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

    axios.post("/api/setWords", { 
      username: sessionData?.user?.username,
      project,
      word: formData.word,
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
                    <input type="text" className="form-control my-1" id="word" onChange={handleInputChange} placeholder="new Word" required/>
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="definitions" className="badge bg-secondary">Definitions: (at least one)</label>
                  <div>
                    <input type="text" className="form-control my-1" id="definition1" onChange={handleInputChange} placeholder="first definition" required/>
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="definition2" onChange={handleInputChange} disabled={!Boolean(formData.definition1.length)} placeholder="second definition" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="definition3" onChange={handleInputChange} disabled={!Boolean(formData.definition2.length)} placeholder="third definition" />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="tag" className="badge bg-warning">Tags:</label>
                  <div>
                    <input type="text" className="form-control my-1" id="tag1" onChange={handleInputChange} placeholder="first tag" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="tag2" onChange={handleInputChange} disabled={!Boolean(formData.tag1.length)} placeholder="second tag" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="tag3" onChange={handleInputChange} disabled={!Boolean(formData.tag2.length)} placeholder="third tag" />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="synonym" className="badge bg-success">Synonyms:</label>
                  <div>
                    <input type="text" className="form-control my-1" id="synonym1" onChange={handleInputChange} placeholder="first synonym" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="synonym2" onChange={handleInputChange} disabled={!Boolean(formData.synonym1.length)} placeholder="second synonym" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="synonym3" onChange={handleInputChange} disabled={!Boolean(formData.synonym2.length)} placeholder="third synonym" />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="antonym" className="badge bg-danger">Antonyms:</label>
                  <div>
                    <input type="text" className="form-control my-1" id="antonym1" onChange={handleInputChange} placeholder="first antonym" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="antonym2" onChange={handleInputChange} disabled={!Boolean(formData.antonym1.length)} placeholder="second antonym" />
                  </div>
                  <div>
                    <input type="text" className="form-control my-1" id="antonym3" onChange={handleInputChange} disabled={!Boolean(formData.antonym2.length)} placeholder="third antonym" />
                  </div>
                </div>
                <div className="form-group my-0 col-12 col-sm-6 col-md-4 my-2">
                  <label htmlFor="description" className="badge bg-info">Description:</label>
                  <div>
                    <textarea className="form-control my-1" 
                              id="description" 
                              onChange={handleInputChange} 
                              rows={4} 
                              maxLength={200}></textarea>
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
                    <button type="submit" className="btn btn-secondary r-0">Create</button>
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