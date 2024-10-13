import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const useAuth = () => {
    const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return { isAuthenticated, token, handleLogout };
};

export default useAuth;