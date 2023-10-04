import { useEffect } from 'react';
import Navbar from '@/components/common/navbar';
import ProjectsHeader from '@/components/projectsList/header';
import ProjectCard from '@/components/projectsList/projectCard';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { KeyboardTabRounded } from '@mui/icons-material';

const projects = [
  {
    // updatedAt: new Date,
    username: "Javad",
    title: "my project",
    language: "Deutsch",
    words: []
  }, 
  {
    // updatedAt: new Date,
    username: "",
    title: "my project",
    language: "Deutsch",
    words: []
  }, 
  {
    // updatedAt: new Date,
    username: "",
    title: "my project",
    language: "Deutsch",
    words: []
  }, 
  {
    // updatedAt: new Date,
    username: "",
    title: "my project",
    language: "Deutsch",
    words: []
  }, 
  {
    // updatedAt: new Date,
    username: "",
    title: "my project",
    language: "Deutsch",
    words: []
  }, 
]

export default function Index() {

  const { status: sessionStatus, data: sessionData } = useSession();

  const router = useRouter()
  const user = router.query.user
  
  const isAuthenticated = ( sessionStatus === 'authenticated' )
  const isInRightUrl = ( sessionData?.user?.username === user )

  useEffect(() => {
    console.log(isAuthenticated, isInRightUrl)
  }, [sessionStatus])

  return (
    <>
      {
        isAuthenticated && isInRightUrl ? 
          <div>
            <Navbar/>
              <div className='d-grid p-3 mt-2'>
                <div className='container shadow bg-light mx-auto h-auto rounded'>
                  <ProjectsHeader />
                  <div className='rounded row justify-content-center'>
                    {
                      projects.map((project) => 
                        <ProjectCard project={project}/>
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

