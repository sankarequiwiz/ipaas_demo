import React from 'react';
import { Link } from 'react-router-dom';
import Mainheader from './header/Index';
import { Alert, Space} from 'antd';

const IntegrationSuccess: React.FC = () => {
  return (
    <div className='border-4 border-gray-500 bg-slate-700 h-[25rem]  text-white w-[70rem] mx-auto flex items-center justify-center hover:bg-slate-800'>
       <Mainheader />
        <div className="text-center ">
            <Space direction="vertical" style={{ width: '100%' }}>
                            <Alert message="Integration Successfully Created" type="success" showIcon closable className='altbox' />
                        </Space>

            <p className='text-4xl mt-2'>Please check the status on the dashboard.</p>
            <Link to={'/'}>
            <Button
              className='bg-gray-300 w-[8rem] mt-8 text-sm font-[600]  hover:bg-gray-200 text-black px-3 p-2 rounded-lg'
            >
              Dashboard
            </Button>
            </Link>
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

export default IntegrationSuccess;
