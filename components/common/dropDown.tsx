import { useState } from 'react'

interface IProps {
  btnText?: string,
  setInterested: (value: string) => void
}

function DropDown({ btnText, setInterested }: IProps) {

  const [dropDownState, setDropDownState] = useState("none")

  const handleDropDown = (e: any) => {
    e.preventDefault()
    setDropDownState(dropDownState === "none" ? "block" : "none")
  }
  const handleInput = (e: any) => {
    setInterested(e.target.name)
  }

  return (
    <div className='my-3 position-relative'>
      <button className="btn btn-outline-secondary dropdown-toggle" onClick={handleDropDown}>
        {btnText ? btnText : "Interested languages"}
      </button>
      <div className={`d-${dropDownState} p-1 my-1 rounded position-absolute bg-white shadow`}>
        <div className="rounded p-1 m-1 justify-content-between d-flex">
          <span>Deutsch</span> 
          <input type="checkbox" name='Deutsch' onChange={handleInput} className='mx-2'/>
        </div>
        <div className="rounded p-1 m-1 justify-content-between d-flex">
          <span>English</span> 
          <input type="checkbox" name='English' onChange={handleInput} className='mx-2'/>
        </div>
      </div>
    </div>
  )
}

export default DropDown