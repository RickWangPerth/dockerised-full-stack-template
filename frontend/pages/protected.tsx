import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import AuthWrapper from '../components/hoc/AuthWrapper';
import { useRouter } from 'next/router';
import { useLogoutMutation } from '../store/api/authApi';
import { clearAuth } from '../store/authSlice';

const ProtectedPage = () => {
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      console.log('response:', response);
      if (response.success) {
        // 更新 Redux 状态
        dispatch(clearAuth());
        // 重定向到登录页面
        router.push('/login');
      } else {
        console.error('注销失败');
      }
    } catch (error) {
      console.error('注销失败:', error);
    }
  };

  return (
    <AuthWrapper>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Protected Page
          </h2>
          <p className="mt-6 text-center text-gray-600">
            Welcome, {userName}
          </p>
          <p className="mt-2 text-center text-gray-600">
            Your email: {userEmail}
          </p>
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ProtectedPage;
