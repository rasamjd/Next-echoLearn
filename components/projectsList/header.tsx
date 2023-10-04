import { useState } from "react";
import styled from "styled-components";
import { NavigateBeforeRounded } from '@mui/icons-material';
import Link from "next/link";
import { BsPlus } from 'react-icons/bs'
import AddModal from "@/components/projectsList/addModal";
import Modal from "react-modal"

export default function ProjectsHeader() {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="row">
      <div className="col-sm-12 px-2 py-1">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <Link href="/" className="text-black">
              <NavigateBeforeRounded fontSize="large"/>
            </Link>
            &nbsp;<h3>Projects</h3>
          </div>
          <button className="btn btn-secondary p-0" onClick={() => setModalOpen(true)}>
            <BsPlus className="" color="" size={40}/>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={200}
        onRequestClose={() => setModalOpen(false)}
        className="p-0 mx-auto my-5"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.25)'
          },
          content: {
            background: '#fff',
            overflow: 'visible',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            width: "fit-content",
          }
        }}
      >
        <AddModal handleCloseModal={setModalOpen}/>
      </Modal>
    </div>
  )
}

const Container = styled.div`

`

