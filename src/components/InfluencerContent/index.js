// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useParams } from 'react-router-dom';
// Utils
import { nameTransform } from '../../utils';
// Actions
import { authActions } from '../../actions/authActions';
import { setWallet, setPopupIsOpen, setInfluencer } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignupWithSocials from '../PopupSignupWithSocials';
import Loader from '../Loader';
import Message from '../Message';

export const InfluencerContent = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.auth.influencer);
    const wallet = useSelector((state) => state.auth.wallet);
    const popupIsOpen = useSelector((state) => state.auth.popupIsOpen);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const { id } = useParams();

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    const connectMetamask = () => {
        dispatch(authActions.connectMeta());
    };

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
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());
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
                    <span>{ nameTransform(influencer) }</span>
                </h1>
                <p className = { Styles.content_info }>
                    <span>{ `Welcome to Referral Page of The ${nameTransform(influencer)}.` }</span>
                    <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
                </p>
                { loading ? <Loader /> : metaBtn }
            </section>
        </>
    );
};
