import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Router from 'next/router';
import { signIn, useSession } from "next-auth/react";

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  const { status: sessionStatus, data: sessionData } = useSession();

  useEffect(() => {
    
    if(sessionStatus === 'authenticated') Router.replace('/')
  }, [sessionStatus])
  
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
    .then(async (data) => {
      console.log("===>", sessionData)
      console.log(data);
      if (data.message.length) {
        try {
          const res = await signIn('credentials', {
            username,
            password,
            redirect: false
          });
          console.log("login res: ", res);
          setStatus(res?.ok ? "Successfuly signed in!" : "Invalid credentials!")
        } catch (error) {
          console.log("login err: ", error)
        } 
        event.target.reset()
      } else {
        setStatus("User doesn't exist!")
      }
    });
  }

  return (
    <Container>
        <div className="container p-3">
          <div className="row">
            <div className="card border-secondary p-0 m-2 mx-auto rounded shadow col-11 col-md-5">
              <div className="card-header">Log in</div>
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
                    {
                      status && 
                      <div className='bg-danger rounded p-1 text-white d-flex justify-content-center'>{status}</div>
                    } 
                    <hr className='my-3 text-white'/>
                    <div className="form-group">
                      <div className="align-text-bottom d-flex justify-content-between">
                        <span className='align-text-bottom py-2'>
                          <Link href="signup" className='text-secondary'>Don&apos;t have an account?</Link>
                        </span>
                        <button type="submit" className="btn btn-secondary r-0">Log in</button>
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