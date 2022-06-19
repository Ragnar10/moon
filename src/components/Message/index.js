// Core
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Actions
import { clearError } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';

const Message = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => dispatch(clearError('')), 5000);

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
