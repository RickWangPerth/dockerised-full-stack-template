import React from 'react';
import { useRegisterMutation } from '../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';
import { useRouter } from 'next/router';

const Register = () => {
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;

    try {
      const response = await register({ userName, password, email }).unwrap();
      // 设置新的 token 和用户信息
      dispatch(setAuth({
        user: response.user,
      }));
      // 重定向到受保护页面
      router.push('/protected');
    } catch (error) {
      console.error('注册失败:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="userName" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
