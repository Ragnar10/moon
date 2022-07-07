// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { Link, useNavigate } from 'react-router-dom';
// Instruments
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Actions
import { authActions } from '../../actions/authActions';
// Styles
import Styles from './styles.module.scss';
// Components
import Message from '../Message';
import Loader from '../Loader';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong format')
        .required('Fill in all fields'),
    password: Yup.string()
        .matches(/^[a-zA-Z0-9!@#$%^&*]+$/, 'Wrong format')
        .required('Fill in all fields'),
});

export const PopupLogin = () => {
    const dispatch = useDispatch();
    const access = useSelector((state) => state.auth.access);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const message = useSelector((state) => state.auth.message);

    const navigate = useNavigate();

    const {
        register, handleSubmit, reset, formState: { errors, isValid },
    } = useForm({
        mode:          'all',
        resolver:      yupResolver(validationSchema),
        defaultValues: {
            email:    '',
            password: '',
        },
    });

    const submitForm = handleSubmit((values) => {
        const logData = {
            username: values.email,
            password: values.password,
        };
        dispatch(authActions.loginUser(logData));
        reset();
    });

    useEffect(() => {
        let timeout;

        if (access.access) {
            timeout = setTimeout(() => {
                navigate('/');
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [access]);

    return (
        <section className = { Styles.popup }>
            <Link to = '/' className = { Styles.shadow } />
            { error && <Message>{ error }</Message> }
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ 'Login' }</h3>
                <form onSubmit = { submitForm } className = { Styles.content_form }>
                    <label
                        htmlFor = { 'email' }
                        className = { Styles.form_label }>
                        <span>{ 'Email' }</span>
                        { errors.email && <span className = { Styles.form_error }>{ errors.email.message }</span> }
                    </label>
                    <input
                        type = 'email'
                        { ...register('email') }
                        id = 'email'
                        placeholder = { 'Email' }
                        className = { Styles.form_field } />
                    <label
                        htmlFor = { 'password' }
                        className = { Styles.form_label }>
                        <span>{ 'Password' }</span>
                        {
                            errors.password
                            && <span className = { Styles.form_error }>{ errors.password.message }</span>
                        }
                    </label>
                    <input
                        type = 'password'
                        { ...register('password') }
                        id = 'password'
                        placeholder = { 'Password' }
                        className = { Styles.form_field } />
                    <div className = { Styles.form_forgot }>{ 'Forgot your password?' }</div>
                    {
                        loading
                            ? <Loader />
                            :  <button
                                type = 'submit'
                                disabled = { !isValid }
                                className = { Styles.form_login_btn }>{ 'Login' }</button>
                    }
                </form>
            </div>
        </section>
    );
};
