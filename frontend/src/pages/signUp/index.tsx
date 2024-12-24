import CoverPage from '../../components/CoverPage'
import { Button, Form } from 'antd'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { UserRegistration } from '../../types/user'
import { useDispatch, useSelector } from 'react-redux'
import { registration } from '../../state/auth/auth-thunk'
import { selectErrors, selectIsAuthLoading } from '../../state/auth/auth-selector'
import FormInput from './FormInput'
import { useEffect } from 'react'
import { resetAuthState, setAuthLoadingState } from '../../state/auth/auth-slice'
import { LoadingStatus } from '../../types/types'
import { BASE } from '../../constants/routeConstants'

const SignUp = () => {
    const dispatch = useDispatch<any>();
    const errors = useSelector(selectErrors)
    const isLoading = useSelector(selectIsAuthLoading)

    const handleClickSignUp = (userRegistrationData: UserRegistration) => {
      dispatch(registration(userRegistrationData))
    }

    useEffect(() => {
      dispatch(setAuthLoadingState(LoadingStatus.LOADED));

      return () => {
        dispatch(resetAuthState())
      }
    }, [])

    return (
        <div className='min-h-screen'>
            <CoverPage title='Sign Up Page' currentPage='Sign Up' listPath={[{title: 'Login', path: BASE }]} />
            <section className='flex items-center justify-center w-full '>
              <div className='lg:w-4/12 w-full shadow-[0_10px_40px_rgba(25,_90,_0,_0.3)] p-8 flex flex-col'>
                  <p className='font-bold text-[#333] text-xl mb-8'>Sign up</p>
                  <Form onFinish={handleClickSignUp}>
                    
                    <FormInput placeholder='Email' error={errors.emailError} 
                      icon={<MailOutlined className='text-lg mr-2'/>} name={'email'}
                    />

                    <FormInput placeholder='First Name' error={errors.firstNameError} 
                      icon={<UserOutlined className='text-lg mr-2'/>} name={'firstName'}
                    />

                    <FormInput placeholder='Last Name' error={errors.lastNameError} 
                      icon={<UserOutlined className='text-lg mr-2'/>} name={'lastName'}
                    />

                    <FormInput placeholder='Password' error={errors.passwordError} 
                      icon={<LockOutlined className='text-lg mr-2'/>} name={'password'} inputPassword
                    />
                    
                    <FormInput placeholder='Confirm Password' error={errors.password2Error} 
                      icon={<LockOutlined className='text-lg mr-2'/>} name={'password2'}
                      inputPassword
                    />

                    <Button block htmlType="submit" disabled={isLoading} className='rounded-none h-11 bg-primary text-white mb-4'>Sign Up</Button>
                    
                  </Form>
                  <div className='flex items-center mb-4'>
                      <div className='flex-grow h-[1px] bg-[#E0E0E0] ' />
                      <div className='p-2 border border-1 border-[#E0E0E0]'>OR</div>
                      <div className='flex-grow h-[1px] bg-[#E0E0E0] '/>
                  </div>
                  
                  <div>
                      <Button className='w-full h-11 rounded-none mb-4'>Sign up with Google</Button>
                      <Button className='w-full h-11 rounded-none mb-4'>Sign up with Apple</Button>
                  </div>
              </div>
            </section>
        </div>
      )
    }

export default SignUp