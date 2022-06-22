// Core
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { useEffect } from 'react';
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

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());
    }, []);

    const baseUrl = 'lvrgd-moon.web.app';
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${baseUrl}`;

    const metaBtn = isMobileDevice()
        ? <a
            href = { metamaskAppDeepLink }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => dispatch(authActions.connectMeta()) }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>;

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
                        : metaBtn
                }
            </section>
        </>
    );
};

export default ContentMeta;
