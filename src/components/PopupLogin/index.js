// Instruments
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// Styles
import Styles from './styles.module.scss';
// Components

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Fill in all fields'),
    password: Yup.string()
        .required('Fill in all fields'),
});

export const PopupLogin = () => {
    const {
        register, handleSubmit, reset, formState: { errors, isValid },
    } = useForm({
        mode:          'all',
        resolver:      yupResolver(validationSchema),
        defaultValues: {
            name:     '',
            password: '',
        },
    });

    const submitForm = handleSubmit((values) => {
        console.log(values);
        reset();
    });

    return (
        <section className = { Styles.popup }>
            <div className = { Styles.shadow } />
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ 'Login' }</h3>
                <form onSubmit = { submitForm } className = { Styles.content_form }>
                    <label
                        htmlFor = { 'name' }
                        className = { Styles.form_label }>
                        <span>{ 'Username' }</span>
                        { errors.name && <span className = { Styles.form_error }>{ errors.name.message }</span> }
                    </label>
                    <input
                        { ...register('name') }
                        id = 'name'
                        placeholder = { 'Username' }
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
                        { ...register('password') }
                        id = 'password'
                        placeholder = { 'Password' }
                        className = { Styles.form_field } />
                    <div className = { Styles.form_forgot }>{ 'Forgot your password?' }</div>
                    <button
                        type = 'submit'
                        disabled = { !isValid }
                        className = { Styles.form_login_btn }>{ 'Login' }</button>
                </form>
            </div>
        </section>
    );
};
