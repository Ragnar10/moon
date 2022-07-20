// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useParams } from 'react-router-dom';
// Utils
import { nameTransform } from '../../../utils';
// Actions
import { authWalletActions } from '../../../actions/authWalletActions';
import { setWallet, setPopupIsOpen, setInfluencer } from '../../../reducers/authSocialSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignupWithSocials from '../PopupSignupWithSocials';
import Loader from '../../Loader';
import Message from '../../Message';
import Socials from '../../Socials';

export const SignUpWallet = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.authSocial.influencer);
    const wallet = useSelector((state) => state.authSocial.wallet);
    const popupIsOpen = useSelector((state) => state.authSocial.popupIsOpen);
    const loading = useSelector((state) => state.authSocial.loading);
    const error = useSelector((state) => state.authSocial.error);

    const { id } = useParams();

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    const connectMetamask = () => {
        dispatch(authWalletActions.connectMeta());
    };

    useEffect(() => {
        dispatch(authWalletActions.checkRef(id));
    }, []);

    useEffect(() => {
        const storageInfluencer = localStorage.getItem('influencer');

        if (storageInfluencer) {
            dispatch(setInfluencer(storageInfluencer));
        } else {
            dispatch(setInfluencer(id));
            localStorage.setItem('influencer', id);
        }
    }, []);

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authWalletActions.connectMetaMobile());
    }, []);

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
            className = { Styles.signup_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            className = { Styles.signup_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            { wallet && popupIsOpen && <PopupSignupWithSocials /> }
            { error && <Message>{ error }</Message> }
            <section className = { Styles.signup }>
                <h1 className = { Styles.signup_title }>
                    <span>{ 'Leveraged' }</span>
                    <span>{ 'x' }</span>
                    <span>{ nameTransform(influencer) }</span>
                </h1>
                <p className = { Styles.signup_info }>
                    <span>{ `Welcome to the Referral Page of ${nameTransform(influencer)}.` }</span>
                    <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
                </p>
                { loading ? <Loader /> : metaBtn }
                <Socials class = { Styles.signup_socials } />
            </section>
        </>
    );
};
