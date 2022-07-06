// Core
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Actions
import { clearError, clearMessage } from '../../reducers/authSlice';
import { clearError as clearErrorSignup, clearMessage as clearMessageSignup } from '../../reducers/signupSlice';
// Styles
import Styles from './styles.module.scss';

const Message = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(clearError());
            dispatch(clearMessage());
            dispatch(clearErrorSignup());
            dispatch(clearMessageSignup());
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className = { `${Styles.message} ${props.class}` }>
            { props.children }
        </div>
    );
};

export default Message;
