import { BsChevronRight } from 'react-icons/bs';
import { IProject } from '@/app/entities/Project';

interface IProps {
  project: IProject
}

export default function ProjectCard({ project }: IProps) {
  return (
    <div className='col-12 col-sm-6 col-lg-4 p-2'>
      <div className="card bg-light shadow-sm ">
        <div className="card-header">
          <p className="card-text m-0">{String(project.language)}</p>
        </div>
        <div className="card-body">
          <h4 className="card-title mb-2">{String(project.title)}</h4> 
          <p className='card-text m-0 mb-3 text-dark'>Last updated at: &nbsp;
            {/* {String(project.updatedAt.getFullYear())}/
            {String(project.updatedAt.getMonth())}/
            {String(project.updatedAt.getFullYear())} */}
          </p>
          <button className="btn btn-outline-secondary align-items-center d-flex ">
            Go to project
            <BsChevronRight className="mx-1" />
          </button>
        </div>
      </div>
    </div>
  )
}