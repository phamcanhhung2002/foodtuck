import { Button, Checkbox, Input } from 'antd'
import CoverPage from '../../components/CoverPage'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectErrorMessage, selectSuccessMessage } from '../../state/auth/auth-selector'
import { resetAuthState } from '../../state/auth/auth-slice'
import { activateAccount, login } from '../../state/auth/auth-thunk'
import { UserData } from '../../types/user'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

const LogIn = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const params = useParams<{ code: string }>();
  const errorMessage = useSelector(selectErrorMessage);
  const successMessage = useSelector(selectSuccessMessage);
  const [userData, setUserData] = useState<UserData>({ email: "", password: ""});

  useEffect(() => {
    if (params.code) {
      dispatch(activateAccount(params.code));
    }

    return () => {
      dispatch(resetAuthState())
    }
  }, [])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }

    if (successMessage) {
      toast.success(successMessage)
    }

    return () => {
      dispatch(resetAuthState())
    }
  }, [errorMessage, successMessage])

  const handleClickLogin = () => {
    dispatch(login({ userData, navigate }))
  }

  return (
    <div className='min-h-screen'>
      <CoverPage title='Login Page' currentPage='Login' listPath={[{title: 'Home', path: '/'}]} />
      <section className='w-full flex items-center justify-center '>
        <div className='2xl:w-4/12 xl:w-/12 lg:w-6/12 md:w-9/12 shadow-[0_10px_40px_rgba(25,_90,_0,_0.3)] p-8 flex flex-col'>
            <p className='font-bold text-[#333] text-xl mb-8'>Sign in</p>
            
            <Input placeholder='Email' className='rounded-none h-11 mb-4' prefix={<MailOutlined className='text-lg mr-2'/>}
              value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
  
            <Input.Password placeholder='Password' className='rounded-none h-11 mb-4' prefix={<LockOutlined className='text-lg mr-2'/>}
              value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}
            />

            <Button className='rounded-none h-11 bg-primary text-white mb-4' onClick={handleClickLogin}>Sign In</Button>
            
            <p className='text-right text-[#828282] text-sm'>Forget password?</p>
            
            <div className='flex items-center mb-4'>
                <div className='flex-grow h-[1px] bg-[#E0E0E0] ' />
                <div className='p-2 border border-1 border-[#E0E0E0]'>OR</div>
                <div className='flex-grow h-[1px] bg-[#E0E0E0] '/>
            </div>
            
            <div>
                <Button className='w-full h-11 rounded-none mb-4'>Sign in with Google</Button>
                <Button className='w-full h-11 rounded-none mb-4'>Sign in with Apple</Button>
            </div>
        </div>
      </section>
    </div>
  )
}

export default LogIn