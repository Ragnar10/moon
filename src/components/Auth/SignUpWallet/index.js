// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useParams } from 'react-router-dom';
// Instruments
import queryString from 'query-string';
// Utils
import { nameTransform } from '../../../utils';
// Actions
import { authWalletActions } from '../../../actions/authWalletActions';
import { setPopupIsOpen, setInfluencer, setStep } from '../../../reducers/authSocialSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignupWithSocials from '../PopupSignupWithSocials';
import Socials from '../../Socials';

export const SignUpWallet = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.authSocial.influencer);
    const popupIsOpen = useSelector((state) => state.authSocial.popupIsOpen);

    const { id } = useParams();

    useEffect(() => {
        dispatch(authWalletActions.checkRef(id));
    }, []);

    useEffect(() => {
        const { userId, token } = queryString.parse(window.location.search);

        const data = {
            id: userId,
            token,
        };

        if (userId && token) {
            dispatch(authWalletActions.getSocialUser(data));
            dispatch(setPopupIsOpen(true));
            dispatch(setStep('two'));
        }
    }, []);

    useEffect(() => {
        const storageInfluencer = localStorage.getItem('influencer');

        if (storageInfluencer) {
            dispatch(setInfluencer(storageInfluencer));
            dispatch(setPopupIsOpen(true));
        } else {
            dispatch(setInfluencer(id));
            localStorage.setItem('influencer', id);
        }
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('popupIsOpen'));

        if (data) {
            dispatch(setPopupIsOpen(data.popupIsOpen));
        }
    }, [popupIsOpen]);

    const openPopup = () => {
        dispatch(setPopupIsOpen(true));

        const data = {
            popupIsOpen: true,
        };
        localStorage.setItem('popupIsOpen', JSON.stringify(data));
    };

    return (
        <>
            { popupIsOpen && <PopupSignupWithSocials /> }
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
                <button
                    onClick = { () => openPopup() }
                    className = { Styles.signup_open_popup_btn }>{ 'Connect Metamask' }</button>;
                <Socials class = { Styles.signup_socials } />
            </section>
        </>
    );
};
