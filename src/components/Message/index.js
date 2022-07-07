// Core
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Actions
import { clearError as clearErrorSocial, clearMessage as clearMessageSocial } from '../../reducers/authSocialSlice';
import { clearError as clearErrorAuth, clearMessage as clearMessageAuth } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';

const Message = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(clearErrorSocial());
            dispatch(clearMessageSocial());
            dispatch(clearErrorAuth());
            dispatch(clearMessageAuth());
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
