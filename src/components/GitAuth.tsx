import React, { Fragment, HTMLProps } from 'react';
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

type ListTypes = {
  label: React.ReactNode
  value: string
  id?: any
  icon: React.ReactElement
  description: React.ReactNode
}

const list: ListTypes[] = [
  {
    label: 'User By user',
    value: 'user_by_user',
    id: 0,
    icon: <TbUsersGroup />,
    description: 'Wants to access your account',
  },
  {
    label: 'Organizations and teams',
    value: 'organizations_and_teams',
    id: 1,
    icon: <GoOrganization />,
    description: 'Read-only access',
  },
  {
    label: 'Repositories',
    value: 'repositories',
    id: 2,
    icon: <RiGitRepositoryLine />,
    description: 'Public and private',
  },
  {
    label: 'Personal user data',
    value: 'personal_user_data',
    id: 3,
    icon: <GoPerson />,
    description: 'Email addresses (read-only)',
  }
];

const List = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement> & ListTypes & { hasChild?: boolean }>(
  ({ className, children, icon, label, description, hasChild = true, ...props }, ref) => {

    const mergeCls: string = React.useMemo(() => {
      const defaultCls = ['flex flex-row items-center gap-5 p-1 px-3 cursor-pointer hover:bg-gray-100 active:bg-gray-200'];
      className && defaultCls.push(className);
      return defaultCls.join(' ');
    }, [className]);

    return (
      <Fragment>
        <button className={mergeCls} {...props} ref={ref}>
          <div>
            {
              React.cloneElement(icon, { className: 'w-[1.5rem] h-[1.5rem] text-black-700' })
            }
          </div>
          <div className='flex flex-[1_0] flex-col items-start gap-[1.5px]' >
            <h2 className=''>{label}</h2>
            <span className='text-sm text-gray-400'>{description}</span>
          </div>
          {
            hasChild && <div><FaChevronDown className='text-gray-500' /></div>
          }
        </button>
      </Fragment>
    )
  });


const GitAuth: React.FC = () => {
  return (
    <div className='w-[27rem] h-[35rem] mx-auto  border-2 border-black-500 p-9 bg-gray-100'>
      <div className='mb-6'>
        <div className='text-center flex justify-between'>
          <div >
            <FaReact className='w-[4rem] h-[4rem] text-black-700' />
          </div>
          <div className='flex justify-between'>
            <hr className="border-t-4 border-dashed border-gray-300 w-[5rem] mt-7 " />
            <IoCheckmarkDoneCircle className='mt-2.5  text-green-700 w-[2.5rem] h-[2.5rem]' />
            <hr className="border-t-4 border-dashed border-gray-300 w-[5rem] mt-7 " />
          </div>
          <div >
            <FaGithub className='w-[4rem] h-[4rem] text-black-700' />
          </div>
        </div>
        <h1 className='font-bold'>Authorize User</h1>
      </div>
      <div className='border-2 border-black-500 p-4 m-4 !bg-zinc-50 flex flex-col gap-5'>
        {
          list && Array.isArray(list) && list.map((item, index: number) => {
            return (
              <List key={index} onClick={(w) => console.log(w)} {...item} hasChild={index !== 0} />
            )
          })
        }
        <hr className="border-t-1 border border-gray-300 w-[18rem] mt-2 " />
        <div className='flex justify-between gap-5'>

          <Link to={'/'}>
            <Button
              className='bg-gray-300 w-[8rem] text-sm font-[400] hover:bg-gray-200 text-black px-3 p-2 rounded-lg'

            >
              Cancel
            </Button>
          </Link>
          <Link to={'/Github_auth_success'}>
            <Button
              className='bg-green-700 w-[8rem] text-sm font-[400] hover:bg-green-600 active:bg-green-800 text-white px-3 p-2 rounded-lg'
            >
              Authorize
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

type ButtonTypes = {
  variant?: 'primary' | 'secondary',
}

const Button = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement> & ButtonTypes>(
  ({ children, variant = 'primary', ...props }, ref) => {
    return <button {...props} ref={ref}>{children}</button>
  })

export default GitAuth;
