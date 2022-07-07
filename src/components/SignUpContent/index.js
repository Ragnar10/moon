// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
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
    name: Yup.string()
        .min(2, 'Min length 2')
        .max(30, 'Max length 30')
        .matches(/^(?! )[a-zA-Z0-9!@#$%^&*\s]+$/, 'Only latin letters, numbers, special characters')
        .required('Fill in all fields'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Fill in all fields'),
    password: Yup.string()
        .min(8, 'Min length 8')
        .max(20, 'Max length 20')
        .matches(/^[a-zA-Z0-9!@#$%^&*]+$/, 'Only latin letters, numbers, special characters')
        .required('Fill in all fields'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Fill in all fields'),
    terms: Yup.bool()
        .oneOf([true]),
});

export const SignUpContent = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
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
            name:             '',
            email:            '',
            password:         '',
            confirm_password: '',
            terms:            false,
        },
    });

    const submitForm = handleSubmit((values) => {
        const regData = {
            first_name: values.name.trim(),
            email:      values.email,
            password:   values.password,
            password2:  values.confirm_password,
        };
        dispatch(authActions.signupUser(regData));
        reset();
    });

    useEffect(() => {
        let timeout;

        if (user.email) {
            timeout = setTimeout(() => {
                navigate('/');
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [user]);

    return (
        <>
            { error && <Message>{ error }</Message> }
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <section className = { Styles.signup }>
                <h3 className = { Styles.signup_title }>{ 'You have been invited to create your affiliate account' }</h3>
                <form onSubmit = { submitForm } className = { Styles.signup_form }>
                    <label
                        htmlFor = { 'name' }
                        className = { Styles.form_label }>
                        <span>{ 'Name' }</span>
                        { errors.name && <span className = { Styles.form_error }>{ errors.name.message }</span> }
                    </label>
                    <input
                        { ...register('name') }
                        id = 'name'
                        placeholder = { 'Your name' }
                        className = { Styles.form_field } />
                    <label
                        htmlFor = { 'email' }
                        className = { Styles.form_label }>
                        <span>{ 'Email address' }</span>
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
                    <label
                        htmlFor = { 'confirm_password' }
                        className = { Styles.form_label }>
                        <span>{ 'Confirm password' }</span>
                        {
                            errors.confirm_password
                            && <span className = { Styles.form_error }>{ errors.confirm_password.message }</span>
                        }
                    </label>
                    <input
                        type = 'password'
                        { ...register('confirm_password') }
                        id = 'confirm_password'
                        placeholder = { 'Repeat your password' }
                        className = { Styles.form_field } />
                    <div className = { Styles.form_checkbox }>
                        <input
                            type = 'checkbox'
                            { ...register('terms') }
                            id = 'terms'
                            className = { Styles.checkbox_field } />
                        <label htmlFor = { 'terms' } className = { Styles.checkbox_label } />
                        <span>{ 'By signing up to leveraged you agree to our Terms of Service and privacy policy' }</span>
                    </div>
                    {
                        loading
                            ? <Loader />
                            : <button
                                type = 'submit'
                                disabled = { !isValid }
                                className = { Styles.form_signup_btn }>{ 'Sign up' }</button>
                    }
                </form>
            </section>
        </>
    );
};
