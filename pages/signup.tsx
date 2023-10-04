import Link from 'next/link';
import styled from '@emotion/styled';
import DropDown from '@/components/common/dropDown';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useSession } from "next-auth/react";

export default function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [interested, setInterested] = useState<string[]>([])
  const [status, setStatus] = useState("")

  const languages = useSelector((state: any) => state.languages) 

  const { status: sessionStatus, data: sessionData } = useSession();

  useEffect(() => {
    
    if(sessionStatus === 'authenticated') Router.replace('/')
  }, [sessionStatus])

  const handleLanguages = (value: string) => {
    setInterested((prev) => {
      const exists = prev.includes(value);
      let updatedValues: string[];
      if (exists) {
        updatedValues = prev.filter(v => v !== value);
      } else {
        updatedValues = [...prev, value];
      }
      return updatedValues;
    });
  }
  
  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    
    fetch("/api/userExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username })
    })
    .then((response) => response.json())
    .then((data) => {

      console.log(data);
      if (data.message.length) {
        setStatus("User already exists!")
        event.target.reset()
      } else {
        setStatus("Created successfuly!")

        axios.post("/api/signup", { username, email, password, interested}, { headers: {"Content-Type": "application/json"} })
        .then((res) => {
          console.log(res.data)
          setStatus(res.data.message)
        })
        .catch((error) => console.log(">>> Error :" + error))
        console.log("Ok!")
      }
    });
  }

  return (
    <Container>
      <div className="container p-3">
        <div className="row">
          <div className="card border-secondary p-0 m-2 mx-auto rounded shadow col-11 col-md-5">
            <div className="card-header">Sign up</div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                  <div className="form-group  my-2">
                    <label htmlFor="username" className="">Username</label>
                    <div className="">
                      <input  type="text" 
                              className="form-control" 
                              id="username" 
                              placeholder="Username" 
                              onChange={(e) => setUsername(e.target.value)}
                              required
                      />
                    </div>
                  </div>
                  <div className="form-group  my-2">
                    <label htmlFor="inputEmail3" className="">Email (optional)</label>
                    <div className="">
                      <input  type="email"  
                              className="form-control" 
                              id="inputEmail3" 
                              placeholder="Email"                    
                              onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group  my-2">
                    <label htmlFor="inputPassword3" className="">Password</label>
                    <div className="">
                      <input  type="password" 
                              className="form-control"  
                              id="inputPassword3"   
                              placeholder="Password" 
                              onChange={(e) => setPassword(e.target.value)}
                              required
                      />
                    </div>
                  </div>
                  <DropDown setInterested={handleLanguages}/>
                  {
                    status && 
                    <div className='bg-danger rounded p-1 text-white d-flex justify-content-center'>{status}</div>
                  }
                  <hr className='my-3 text-white'/>
                  <div className="form-group">
                    <div className="align-text-bottom d-flex justify-content-between">
                      <span className='align-text-bottom py-2'>
                        <Link href="login" className='text-secondary'>Already have an account?</Link>
                      </span>
                      <button type="submit" className="btn btn-secondary r-0">Sign up</button>
                    </div>
                  </div>            
              </form>
            </div>
          </div>
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