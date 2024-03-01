import Navbar from '@/components/common/navbar';
import Link from 'next/link';
import { EastRounded } from '@mui/icons-material';
import { useSession } from "next-auth/react";

export default function Index() {

  const { status: sessionStatus, data: sessionData } = useSession();

  return (
    <div>
      <Navbar />
      <div className="container p-1 justify-content-center">
        {
          sessionStatus === "authenticated" &&
            <div className="row">
              <Link href={`/${sessionData?.user?.username}`} className="secondary link-underline-light btn btn-outline-secondary mt-3">
                Go to dashboard &nbsp;
                <EastRounded />
              </Link>
            </div>
        }
        <div className="row">
          <div className="card card-light mt-3 rounded shadow d-inline-block">
            <div className='card-body'>    
              <p className='h4'>Welcome to <span className='text-secondary'>EchoLearn</span>!</p>
              EchoLearn is an environment, in which you can practice 
              and expand your knowledge in all of the supported languages.  <br />
              <ul>
                <li>You can make new projects and define lists of all the new words you want to learn,</li>
                <li>with multiple ablilities such as adding more than one definition and also having
                  tags, synonyms and antonyms. </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

