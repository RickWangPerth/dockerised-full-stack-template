import React from 'react';
import { useLoginMutation } from '../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';
import { useRouter } from 'next/router';

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;

    try {
      const response = await login({ userName, password }).unwrap();
      // 设置新的 token 和用户信息
      dispatch(setAuth({
        user: response.user,
      }));
      // 重定向到受保护页面
      router.push('/protected');
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" name="userName" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
