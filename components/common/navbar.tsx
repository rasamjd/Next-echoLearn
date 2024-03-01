import { useState } from 'react';
import Link from 'next/link'
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import { LogoutRounded, LoginRounded } from '@mui/icons-material';

export default function Navbar() {

  const [modalOpen, setModalOpen] = useState(false)

  const { status: sessionStatus, data: sessionData } = useSession();

  const router = useRouter()
  const user = router.query.user

  const handleSignOut = async () => {
    await signOut()
    setModalOpen(false)
  }

  return (
    <Container>
      <nav className="navbar navbar-light shadow bg-light m-3 p-3 h-auto rounded">
        <div>
          <p className='h2 text-secondary'>EchoLearn</p>
          { 
            sessionStatus === "authenticated" &&
            <span> Welcome, { sessionData?.user.username }! </span>
          }
        </div>
        { 
          sessionStatus != "authenticated" ?
            <Link href={"/login"} className='btn btn-secondary'>
              Login &nbsp;
              <LoginRounded />
            </Link>
            :
            <div>
              {
              !user ?
                <button className='btn btn-secondary' onClick={() => setModalOpen(true)}>
                  Sign out &nbsp;
                  <LogoutRounded />
                </button>
                : null
              }
            </div>
        }
      </nav>
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
        <div className="card border-secondary m-2 mx-auto rounded shadow ">
          <div className="card-header px-2">Sign out!</div>
          <div className="card-body px-3">
            <p>Are you sure you want to sign out?</p>
            <div className='d-flex justify-content-between'>
              <button className='btn btn-outline-secondary' onClick={() => setModalOpen(false)}>Cancel</button>
              <button className='btn btn-secondary' onClick={handleSignOut}>Sign out</button>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  )
}

const Container = styled.div`
`