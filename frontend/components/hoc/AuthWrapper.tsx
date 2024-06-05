import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAuthDataQuery, useRefreshTokenMutation } from '../../store/api/authApi';
import { RootState, AppDispatch } from '../../store';
import { setAuth } from '../../store/authSlice';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const [refreshTokenMutation] = useRefreshTokenMutation();

  const { data, error, isLoading } = useGetAuthDataQuery(undefined, { skip: !!userEmail });

  useEffect(() => {
    if (data) {
      console.log("Setting auth with data:", data);
      dispatch(setAuth({
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
        },
      }));
    }
  }, [data, router, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Attempting to refresh token");
      refreshTokenMutation().then((result) => {
        console.log("Refresh token result:", result);
        if ('data' in result && result.data) {
          dispatch(setAuth({
            user: result.data.refreshToken.user,
          }));
        } else {
          console.log("Refresh token failed, logging out");
          router.push('/login');
        }
      }).catch((error) => {
        console.log("Refresh token error:", error);
        router.push('/login');

      });
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [dispatch, refreshTokenMutation, router]);

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (error) {
    let errorMessage = 'An unknown error occurred';
    if ('status' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      errorMessage = (error.data as { message: string }).message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log("Error occurred:", errorMessage);
    return <div>Error: {errorMessage}</div>;
  }

  console.log("Rendering children");
  return <>{children}</>;
};

export default AuthWrapper;
