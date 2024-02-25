

import { Eye, EyeOff, Home } from 'lucide-react';
import React, { useState } from 'react'
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { AuthLogin } from '../../apiCalls/authentication';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [password_visible, set_password_visible] = useState(false);

    const navigate = useNavigate();

    const [login_credentials, set_login_credentials] = useState({
        email: "",
        password: "",
    });

    const [loading_visible, set_loading_visible] = useState(false);

    const login = async () => {
        set_loading_visible(true);

        const is_empty = login_credentials.email.replaceAll(" ", "") == "" || login_credentials.password.replaceAll(" ", "") == "";

        if(is_empty) {
            Swal.fire({
                icon: 'error',
                title: 'Empty Inputs',
                text: 'Please check your inputs and try again'
            });
            set_loading_visible(false);
        }

        const login_response = await AuthLogin(login_credentials);


        Swal.fire({
            ...login_response,
            icon: login_response.status,
        });

        set_loading_visible(false);
        navigate('/admin');

    }

    


  return (
    <div>
        <Loading show={loading_visible}/>
        <div className="h-screen p-24 ">
            {/* <div className="fixed w-full h-full z-0 top-0 left-0">
                <img src="/images/background.webp" alt="" className="h-full w-full object-cover relative z-0" />
                <div className="bg-black bg-opacity-55 h-full w-full absolute top-0 left-0 z-10"></div>
            </div> */}

            <div className="bg-white w-[500px] min-h-[200px] p-6 rounded-xl relative shadow-2xl mx-auto z-10">
                <div className="flex items-center justify-between">
                    <h1 className='font-bold text-3xl text-gray-700'>Welcome Back</h1>

                    <div onClick={() => navigate('/')} className="h-[40px] w-[40px] rounded-xl flex items-center justify-center bg-blue-500 hover:bg-purple-500 active:bg-blue-600 text-white ">
                        <Home />
                    </div>
                </div>
                <p className='text-sm text-gray-400 mt-1.5'>Provide the admin email and password to access the dashboard</p>

                <div className="input-box my-6">
                    <div className="input flex flex-col gap-1.5">
                        <label htmlFor="email" className='opacity-70'>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder='metaAdmin@meta.org' 
                            className='shadow border rounded-xl p-3 bg-gray-100' 
                            value={login_credentials.email} 
                            onChange={(event) => set_login_credentials({ ...login_credentials, email: event.target.value})} 
                        />
                    </div>

                    <div className="input flex flex-col gap-1.5 mt-4">
                        <label htmlFor="email" className='opacity-70'>Password</label>
                        <div className="relative">
                            <input 
                                type={password_visible ? 'text' : 'password'} 
                                name="password" placeholder={password_visible ? 'p@22w0r6#$' : '************'} 
                                className='shadow border rounded-xl p-3 bg-gray-100 w-full'
                                value={login_credentials.password}
                                onChange={(event) => set_login_credentials({...login_credentials, password: event.target.value})} 
                            />
                            <div onClick={() => set_password_visible(!password_visible)} className="absolute top-1/2 -translate-y-1/2 scale-90 active:scale-75 right-1 h-[45px] w-[45px] rounded-2xl flex items-center justify-center border shadow bg-white hover:bg-purple-500 active:bg-blue-500 hover:text-white">
                                {password_visible ? <EyeOff /> : <Eye />}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={login} className="flex-grow bg-purple-500 hover:bg-blue-500 active:scale-90 active:bg-purple-600 text-white rounded-xl px-2 h-[40px] w-full ">Log In</button>
            </div>
        </div>
    </div>
  )
}

export default Login 