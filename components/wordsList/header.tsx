import { useState } from "react"
import { LoopRounded, AddCircleOutlineOutlined, NavigateBeforeRounded } from '@mui/icons-material';
import Link from "next/link";
import { useRouter } from 'next/router'
import AddModal from "@/components/wordsList/addModal";
import Modal from "react-modal"

interface IProps {
  changeCardStyle: () => void,
  handleCardsChange: () => void
}

export default function WordsHeader({ changeCardStyle, handleCardsChange }: IProps) {

  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()
  return (
    <div className="row">
      <div className="col-sm-12 px-2 py-1">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <Link href={`/${router.query.user}`} className="text-black">
              <NavigateBeforeRounded fontSize="large"/>
            </Link>
            &nbsp;<h3>Words</h3>
          </div>
          <div className=''>
            <button className="btn btn-outline-secondary p m-1 h-auto" onClick={changeCardStyle}>
              <span className='d-none d-sm-inline'>Change cards</span> &nbsp;
              <LoopRounded />
            </button>
            <button className="btn btn-secondary p m-1" onClick={() => setModalOpen(true)}>
              Add &nbsp;
              <AddCircleOutlineOutlined className=''/>
            </button>
          </div>
        </div>
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
        <AddModal handleCloseModal={setModalOpen} handleCardsChange={handleCardsChange}/>
      </Modal>
    </div>
  )
}