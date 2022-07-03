// Instruments
import { useForm } from 'react-hook-form';
// Styles
import Styles from './styles.module.scss';

export const SignUpContent = () => {
    const { register, handleSubmit, reset } = useForm({
        mode:          'onSubmit',
        defaultValues: {
            name:             '',
            email:            '',
            password:         '',
            confirm_password: '',
            terms:            false,
        },
    });

    const submitForm = handleSubmit((values) => {
        console.log(values);
        reset();
    });

    return (
        <section className = { Styles.auth }>
            <h3 className = { Styles.auth_title }>{ 'You have been invited to create your affiliate account' }</h3>
            <form onSubmit = { submitForm } className = { Styles.auth_form }>
                <label
                    htmlFor = { 'name' }
                    className = { Styles.form_label }>{ 'Name' }</label>
                <input
                    { ...register('name') }
                    id = 'name'
                    placeholder = { 'Your name' }
                    className = { Styles.form_field } />
                <label
                    htmlFor = { 'email' }
                    className = { Styles.form_label }>{ 'Email address' }</label>
                <input
                    { ...register('email') }
                    id = 'email'
                    placeholder = { 'Email' }
                    className = { Styles.form_field } />
                <label
                    htmlFor = { 'password' }
                    className = { Styles.form_label }>{ 'Password' }</label>
                <input
                    { ...register('password') }
                    id = 'password'
                    placeholder = { 'Password' }
                    className = { Styles.form_field } />
                <label
                    htmlFor = { 'confirm_password' }
                    className = { Styles.form_label }>{ 'Confirm password' }</label>
                <input
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
                    <span>{ 'By signing up to leveraged you agree to our Terms of Serivce and privbacy policy' }</span>
                </div>
                <button
                    type = 'submit'
                    className = { Styles.form_sign_btn }>{ 'Sign up' }</button>
            </form>
        </section>
    );
};
