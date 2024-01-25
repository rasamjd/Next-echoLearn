import { useState, useEffect } from "react";
import Navbar from '@/components/common/navbar';
import WordsHeader from '@/components/wordsList/header';
import WordCardSmall from '@/components/wordsList/wordCardSm';
import WordCardBig from "@/components/wordsList/wordCardBig";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { KeyboardTabRounded } from '@mui/icons-material';
import { ReplayRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { fetchWords } from "@/app/redux/features/words";
import { IWord } from "@/app/entities/Word";
import { IWordsState } from "@/app/redux/features/words"; 

export default function Project() {

  const [bigCards, setBigCards] = useState(true);
  const [words, setWords] = useState<IWordsState>({
    loading: true,
    words: [],
    error: ""
  })
  const [cardsToggle, setCardsToggle] = useState(false)

  const { status: sessionStatus, data: sessionData } = useSession();

  const router = useRouter()
  const user = router.query.user
  const projectTitle = router.query.project
  
  const isAuthenticated = ( sessionStatus === 'authenticated' )
  const isInRightUrl = ( sessionData?.user?.username === user )

  const wordsState = useAppSelector((state) => state.word)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!wordsState.words.length) {
      dispatch(fetchWords({ user }))
    } else setWords(wordsState)

  }, [sessionStatus, cardsToggle, wordsState])

  const changeCardStyle = () => {
    setBigCards(!bigCards)
  }
  const handleCardsChange = () => {
    setCardsToggle(!cardsToggle)
  }

  return (
    <>
      {
        isAuthenticated && isInRightUrl ? 
          <div>
            <Navbar/>
              <div className='d-grid p-3 mt-2'>
                <div className='container shadow bg-light mx-auto pb-3 h-auto rounded'>
                  <WordsHeader changeCardStyle={changeCardStyle} handleCardsChange={handleCardsChange}/>        
                  {
                    words.loading ?
                    <div className='card m-auto col-4 d-flex justify-content-center p-2 my-4'>
                      <p className='mb-3 d-flex justify-content-center'>Loading...</p>
                      <button 
                        className="btn btn-outline-secondary" onClick={() => router.reload()}>
                        <span className="m-auto h6 m-2">Retry  <ReplayRounded /></span>
                      </button>
                    </div>
                      :
                      words.words.length > 0 ?
                        <div className='rounded row justify-content-center'>
                          {
                            bigCards ?
                              words.words.map((word) => {
                                if(word.project == projectTitle && word.username == user) {
                                  return <WordCardBig word={word} handleCardsChange={handleCardsChange}/>
                                }
                              })
                              :
                              words.words.map((word) => {
                                if(word.project == projectTitle && word.username == user) {
                                  return <WordCardSmall word={word} />
                                }
                              })
                          }
                          </div>
                        :
                        <div className='card m-auto col-4 d-flex justify-content-center p-2 my-4'>
                          <p className='mb-3 d-flex justify-content-center'>{ words.error }</p>
                          <button 
                            className="btn btn-outline-secondary" onClick={() => router.reload()}>
                            <span className="m-auto h6 m-2">Retry  <ReplayRounded /></span>
                          </button>
                        </div>
                  }
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