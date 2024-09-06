import { useState } from 'react';
import { postData } from '../utils/fetchUtils';
import { useNavigate, } from 'react-router-dom';
import { LoginApiResponse } from '../interface/request/ApiResponse';

import TipMessage from './TipMessage';

const Login = () => {



  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTip, setShowTip] = useState<boolean>(false);

  const showMessage = (info: string) => {
    setMessage(info)
    setShowTip(true);
    setTimeout(() => {
      setShowTip(false);
    }, 3000); // Show the tip for 3 seconds
  };
  const handleLogin = async () => {
    postData<LoginApiResponse>('/api/auth/login', { username: username, password: password }).then((res) => {
      if (res.code != 0) {
        showMessage(res.msg)
      } else {
        if(res.data){
          localStorage.setItem("token", res.data.accessToken.access_token ? res.data.accessToken.access_token : '')
        }
        
        navigate('/')
      }
    });
  };


  return (
    <div className='p-2'>

      {showTip && (
        <TipMessage message={message} type="info" />
      )}
      <div className=" bg-gray-100 flex flex-col justify-center py-3 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            登录
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              创建账号
            </a>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={username}
                  id="email"
                  name="email"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="账号"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="密码"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">


              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  忘记密码?
                </a>
              </div>
            </div>
            <div>
              <button onClick={handleLogin}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                登录
              </button>
            </div>


          </div>
        </div>
      </div>








    </div>
  );
};

export default Login;
