// Core
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authActions } from '../../actions';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignup from '../PopupSignup';
import Loader from '../Loader';
import Message from '../Message';

const ContentMeta = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    return (
        <>
            { wallet && <PopupSignup /> }
            { error && <Message>{ error }</Message> }
            <section className = { Styles.content }>
                <h1 className = { Styles.content_title }>
                    <span>{ 'Leveraged' }</span>
                    <span>{ 'x' }</span>
                    <span>{ 'Moon Carl' }</span>
                </h1>
                <p className = { Styles.content_info }>
                    <span>{ 'Welcome to Referral Page of The Moon Carl.' }</span>
                    <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
                </p>
                {
                    loading
                        ? <Loader />
                        : <button
                            onClick = { () => dispatch(authActions.connectMeta()) }
                            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>
                }
            </section>
        </>
    );
};

export default ContentMeta;
