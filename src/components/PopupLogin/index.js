// Instruments
import { useForm } from 'react-hook-form';
// Styles
import Styles from './styles.module.scss';
// Components

export const PopupLogin = (props) => {
    const { register, handleSubmit, reset } = useForm({
        mode:          'onSubmit',
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
            <div
                onClick = { () => props.onSetToggle(false) }
                className = { Styles.shadow } />
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ 'Login' }</h3>
                <form onSubmit = { submitForm } className = { Styles.content_form }>
                    <label
                        htmlFor = { 'name' }
                        className = { Styles.form_label }>{ 'Username' }</label>
                    <input
                        { ...register('name') }
                        id = 'name'
                        placeholder = { 'Username' }
                        className = { Styles.form_field } />
                    <label
                        htmlFor = { 'password' }
                        className = { Styles.form_label }>{ 'Password' }</label>
                    <input
                        { ...register('password') }
                        id = 'password'
                        placeholder = { 'Password' }
                        className = { Styles.form_field } />
                    <div className = { Styles.form_forgot }>{ 'Forgot your password?' }</div>
                    <button
                        type = 'submit'
                        className = { Styles.form_login_btn }>{ 'Login' }</button>
                </form>
            </div>
        </section>
    );
};
