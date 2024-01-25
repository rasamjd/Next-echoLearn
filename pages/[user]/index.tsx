import { useState, useEffect } from 'react';
import Navbar from '@/components/common/navbar';
import ProjectsHeader from '@/components/projectsList/header';
import ProjectCard from '@/components/projectsList/projectCard';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { KeyboardTabRounded, ReplayRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { fetchProjects } from '@/app/redux/features/projects';
import { IPtojectsState } from '@/app/redux/features/projects';

export default function Index() {

  const [projects, setProjects] = useState<IPtojectsState>({
    loading : true,
    projects : [],
    error : ""
  })

  const { status: sessionStatus, data: sessionData } = useSession();

  const router = useRouter()
  const user = router.query.user
  
  const isAuthenticated = ( sessionStatus === 'authenticated' )
  const isInRightUrl = ( sessionData?.user?.username === user )

  const projectsState = useAppSelector((state) => state.project)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!projectsState.projects.length) {
      dispatch(fetchProjects({ user }))
    } else setProjects(projectsState)

    console.log(projectsState)

  }, [sessionStatus, projectsState])

  return (
    <>
      {
        isAuthenticated && isInRightUrl ? 
          <div>
            <Navbar/>
              <div className='d-grid p-3 mt-2'>
                <div className='container shadow bg-light mx-auto h-auto rounded'>
                  <ProjectsHeader />
                  {
                    projects.loading ?
                      <div className='card m-auto col-4 d-flex justify-content-center p-2 my-4'>
                        <p className='mb-3 d-flex justify-content-center'>Loading...</p>
                        <button 
                          className="btn btn-outline-secondary" onClick={() => router.reload()}>
                          <span className="m-auto h6 m-2">Retry  <ReplayRounded /></span>
                        </button>
                      </div>
                      :
                      projects.projects.length ?
                        <div className='rounded row justify-content-center'>
                          {
                            projects.projects.map((project) => {
                              if(project.username == user) {
                                return <ProjectCard project={project}/>
                              }
                            })
                          }
                        </div>
                        :
                        <div className='card m-auto col-4 d-flex justify-content-center p-2 my-4'>
                          <p className='mb-3 d-flex justify-content-center'>{ projects.error }</p>
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

