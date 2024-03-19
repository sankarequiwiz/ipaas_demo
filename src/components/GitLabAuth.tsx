import React from 'react';
import { IoLogoGitlab } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaBitbucket } from "react-icons/fa";


const GitLabAuth: React.FC = () => {
    return (
        <div className='w-[27rem] h-[37rem] mx-auto  border-2 border-black-500 p-9 bg-gray-100'>
            <div >
                <IoLogoGitlab className='w-[3rem] h-[3rem] text-black-700 mx-auto text-orange-500' />
                <h1 className='font-semibold'>GitLab.com</h1>
            </div>
            <div>
                <div className='flex start mt-8'>
                    <div>
                        <h3 className='text-sm flex flex-[1_0] flex-col items-start font-semibold text-gray-500'>Username or primary email</h3>
                        <input type="text" className='border border-gray-600 mt-1 w-[20rem] rounded-md' />
                        <h3 className='text-sm flex flex-[1_0] flex-col items-start font-semibold mt-2 text-gray-500'>Password</h3>
                        <input type="password" className='border border-gray-600 mt-1 w-[20rem] rounded-md' />
                    </div>
                </div>
                <div className='flex text-blue-800 font-semibold text-sm'>
                    <a href="">Forgot your password?</a>
                </div>
            </div>
            <div>
                <label htmlFor="" className='flex mt-8'>
                    <input type="checkbox" name="" id="" />
                    <h4 className='ml-4 text-sm'>Remember me</h4>

                </label>
            </div>
            <div>
                <button className='w-[22rem] mt-8 rounded-sm  bg-blue-800 text-gray-100 font-semibold'>
                    Sign in
                </button>
                <div className='flex-center font-semibold text-sm '>
                    <a href="" className='text-gray-500'>Don’t have an account yet? <span className=' text-blue-800'>Register now</span></a>
                </div>
            </div>
            <div className='flex'>

                <hr className="border-t-1 border border-gray-300 w-[6rem] mt-8 " />
                <h3 className='mt-[1.2rem] mr-4 ml-4 text-sm'>or sign in with</h3>
                <hr className="border-t-1 border border-gray-300 w-[6rem] mt-8 " />
            </div>
            <div>
                <a href="">
                    <div className='w-[22rem] border-t-1 border border-gray-300 h-[2rem] flex justify-between mt-6 hover:bg-gray-200 '>
                        <div className='flex mx-auto gap-4'>
                            <FaGoogle className='mt-[0.3rem]' />
                            <h2 >Google</h2>
                        </div>
                    </div></a>
                <a href="">
                    <div className='w-[22rem] border-t-1 border border-gray-300 h-[2rem] flex mt-2 hover:bg-gray-200'>
                        <div className='flex mx-auto gap-4'>
                            <FaGithub className='mt-[0.3rem] ' />
                            <h2 >GitHub</h2>
                        </div>
                    </div></a>
                <a href="">
                    <div className='w-[22rem] border-t-1 border border-gray-300 h-[2rem] flex mt-2 hover:bg-gray-200'>
                        <div className='flex mx-auto gap-4'>
                            <FaBitbucket className='mt-[0.3rem] ml-3' />
                            <h2 >Bitbucket</h2>
                        </div>
                    </div>
                </a>



            </div>

        </div>
    );
};

export default GitLabAuth;
