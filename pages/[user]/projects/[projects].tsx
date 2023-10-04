import { useState, useEffect } from "react";
import Navbar from '@/components/common/navbar';
import WordsHeader from '@/components/wordsList/header';
import WordCardSmall from '@/components/wordsList/wordCardSmall';
import WordCardBig from "@/components/wordsList/wordCardBig";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { KeyboardTabRounded } from '@mui/icons-material';

const words = [
  {
    username: "",
    project: "",
    word: "Auto",
    language: "Deutsch",
    definitions: ["car"],
    tags: ["das"],
    synonyms: [],
    antonyms: [],
    description: ""
  },
  {
    username: "",
    project: "",
    word: "dunkel",
    language: "Deutsch",
    definitions: ["dark"],
    tags: ["adj", "colour"],
    synonyms: ["schwarz"],
    antonyms: ["weiss"],
    description: "its a color."
  },
]

export default function Project() {

  const [cardStyle, setcardStyle] = useState("big");

  const { status: sessionStatus, data: sessionData } = useSession();

  const router = useRouter()
  const user = router.query.user
  
  const isAuthenticated = ( sessionStatus === 'authenticated' )
  const isInRightUrl = ( sessionData?.user?.username === user )

  useEffect(() => {
    console.log(isAuthenticated, isInRightUrl)
  }, [sessionStatus])

  const changeCardStyle = () => {
    cardStyle === "big" ? setcardStyle("small") : setcardStyle("big")
  }

  return (
    <>
      {
        isAuthenticated && isInRightUrl ? 
          <div>
            <Navbar/>
              <div className='d-grid p-3 mt-2'>
                <div className='container shadow bg-light mx-auto pb-3 h-auto rounded'>
                  <WordsHeader changeCardStyle={changeCardStyle} />
                  <div className='rounded row justify-content-center'>
                    {
                      cardStyle === "big" ?
                          words.map((word) => 
                          <WordCardBig word={word}/>
                        )
                        :
                          words.map((word) => 
                          <WordCardSmall word={word}/>
                        )
                    }
                  </div>
                </div>
              </div>
          </div>
          :
          <div className='card m-auto col-4 d-flex justify-content-center p-2 my-4'>
            <p className='h3 d-flex justify-content-center'>Access denied!</p>
            <Link href="/" className="secondary link-underline-light btn btn-outline-secondary mt-3">
              Back to homepage &nbsp;
              <KeyboardTabRounded fontWeight={800}/>
            </Link>
          </div>
      }
    </>
  )
}