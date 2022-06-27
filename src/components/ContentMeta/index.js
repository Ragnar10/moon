// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Instruments
import queryString from 'query-string';
// Actions
import { authActions } from '../../actions';
// Hooks
import { useToggle } from '../../hooks';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignup from '../PopupSignup';
import Loader from '../Loader';
import Message from '../Message';

const ContentMeta = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const twitterSuccess = useSelector((state) => state.auth.twitterSuccess);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [toggle, setToggle] = useToggle();

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    const connectMetamask = () => {
        dispatch(authActions.connectMeta());
        setToggle(true);
    };

    const authTwitter = () => {
        const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

        if (oauth_token && oauth_verifier) {
            const data = {
                req_oauth_token: oauth_token,
                oauth_verifier,
            };

            dispatch(authActions.requestTwitterAccessToken(data));
        }
    };

    const getData = () => {
        dispatch(authActions.getTwitterData());
    };

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());
    }, []);

    useEffect(() => {
        authTwitter();
    }, []);

    useEffect(() => {
        if (twitterSuccess) return getData();
    }, [twitterSuccess]);

    const metaBtn = isMobileDevice()
        ? <a
            href = { `https://metamask.app.link/dapp/${process.env.REACT_APP_TELEGRAM_API_PATH}` }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            { wallet && toggle && <PopupSignup setToggle = { setToggle } /> }
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
                { loading ? <Loader /> : metaBtn }
            </section>
        </>
    );
};

export default ContentMeta;
