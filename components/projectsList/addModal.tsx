import { useState } from "react"
import styled from '@emotion/styled';
import axios from 'axios';
import { useSession } from "next-auth/react";

interface IProps {
  handleCloseModal: (modalOpen: boolean) => void
}

export default function addModal({ handleCloseModal }: IProps) {

  const [status, setStatus] = useState("")
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")

  const { data: sessionData } = useSession();

  const closeModal = () => {
    handleCloseModal(false)
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()

    fetch("/api/projectExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: sessionData?.user.username, title })
    })
    .then((response) => response.json())
    .then((data) => {

      console.log(data);
      if (data.message.length) {
        setStatus("This project already exists!")
        event.target.reset()
      } else {
        setStatus("Created successfuly!")

        axios.post("/api/setProjects", { username: sessionData?.user.username, title, language }, { headers: {"Content-Type": "application/json"} })
        .then((res) => {
          console.log(res.data)
          setStatus(res.data.message)
          handleCloseModal(false)
        })
        .catch((error) => console.log(">>> Error :" + error))
        console.log("Ok!")
          }
      });
  }

  return (
    <Container>
        <div className="card border-secondary m-2 mx-auto rounded shadow ">
          <div className="card-header px-2">New Project</div>
          <div className="card-body px-3">
            <form onSubmit={handleFormSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="title" className="">Project title</label>
                  <div className="">
                    <input  type="text" 
                            className="form-control"  
                            id="title"
                            placeholder="Project title" 
                            maxLength={20} 
                            onChange={(e) => setTitle(e.target.value)}
                            required
                    />
                  </div>
                </div>
                <select className="form-select form-control" onChange={(e) => setLanguage(e.target.value)} required>
                  <option disabled hidden selected value="">Choose language</option>
                  <option value="english">English</option>
                  <option value="deutsch">Deutsch</option>
                </select>
                {
                  status && 
                  <div className='bg-danger rounded p-1 text-white d-flex justify-content-center mt-3'>{status}</div>
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
`