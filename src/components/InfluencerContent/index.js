// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { set } from 'react-hook-form';
import { authActions } from '../../actions';
import { setPopupIsOpen, setUser } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignupWithSocials from '../PopupSignupWithSocials';
import Loader from '../Loader';
import Message from '../Message';

const InfluencerContent = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const wallet = useSelector((state) => state.auth.wallet);
    const popupIsOpen = useSelector((state) => state.auth.popupIsOpen);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());
    }, []);

    const connectMetamask = () => {
        if (isMobileDevice()) return null;

        dispatch(authActions.connectMeta());
    };

    useEffect(() => {
        if (wallet && !user.token) {
            const userData = {
                metamask: wallet,
                ref:      'moon-card',
                twitter:  '',
                telegram: '',
            };

            dispatch(authActions.createUser(userData));
        }
    }, [wallet]);

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('user'));

        if (storageUser) {
            dispatch(authActions.getUser(storageUser));
        }
    }, []);

    const metaBtn = isMobileDevice() && !wallet
        ? <a
            href = { `https://metamask.app.link/dapp/${process.env.REACT_APP_TELEGRAM_API_PATH}` }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            { user.metamask && popupIsOpen && <PopupSignupWithSocials /> }
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

export default InfluencerContent;
