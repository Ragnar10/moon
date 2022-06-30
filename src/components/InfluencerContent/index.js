// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authActions } from '../../actions';
import { setWallet, setPopupIsOpen } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignupWithSocials from '../PopupSignupWithSocials';
import Loader from '../Loader';
import Message from '../Message';

const InfluencerContent = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const popupIsOpen = useSelector((state) => state.auth.popupIsOpen);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    const connectMetamask = () => {
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());

        dispatch(authActions.connectMeta());
    };

    useEffect(() => {
        const storageWallet = localStorage.getItem('wallet');
        const data = JSON.parse(storageWallet);

        if (storageWallet) {
            dispatch(setWallet(data.wallet));
            dispatch(setPopupIsOpen(data.popupIsOpen));
        }
    }, [wallet, popupIsOpen]);

    const metaBtn = isMobileDevice() && !wallet
        ? <a
            href = { `https://metamask.app.link/dapp/${process.env.REACT_APP_TELEGRAM_API_PATH}` }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            { wallet && popupIsOpen && <PopupSignupWithSocials /> }
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
