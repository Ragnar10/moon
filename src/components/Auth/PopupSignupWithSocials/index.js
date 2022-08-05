// Core
import {useDispatch, useSelector} from 'react-redux';
import Styles from './styles.module.scss';
import {useEffect, useRef} from 'react';
// Components
import Message from '../../Message';
import WithMetamask from './WithMetamask';
import WithTwitter from './WithTwitter';
import WithTelegram from './WithTelegram';
import {setPopupIsOpen} from "../../../reducers/authSocialSlice";
import {current} from "@reduxjs/toolkit";

const PopupSignupWithSocials = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSocial.user);
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const step = useSelector((state) => state.authSocial.step);
    const error = useSelector((state) => state.authSocial.error);
    const message = useSelector((state) => state.authSocial.message);
    const popupIsOpen = useSelector((state) => state.authSocial.popupIsOpen);


    const stepsTwoClass = user.telegram || step === 'two' ? `${Styles.steps_two} ${Styles.wallet_ready}` : Styles.steps_two;
    const stepsThreeClass = user.twitter || step === 'three' ? `${Styles.steps_three} ${Styles.wallet_ready}` : Styles.steps_three;

    const ref = useRef()


    const checkIfClickedOutside = () => {
        if (popupIsOpen && ref.current && step === 'one') {
            const data = {
                popupIsOpen: false,
            };
            localStorage.setItem('popupIsOpen', JSON.stringify(data));
            dispatch(setPopupIsOpen(false));
        }
    }


    return (
        <section className={Styles.popup}>
            <div className={Styles.shadow} ref={ref} onClick={checkIfClickedOutside}/>
            {error && <Message>{error}</Message>}
            {message && <Message class={Styles.message}>{message}</Message>}
            <div className={Styles.popup_content}>
                {step === 'one' && <WithTelegram/>}
                {step === 'two' && telegramData && <WithTwitter/>}
                {step === 'three' && telegramData && twitterData && <WithMetamask/>}
                <div className={Styles.steps}>
                    <span className={Styles.steps_one}/>
                    <span className={stepsTwoClass}/>
                    <span className={stepsThreeClass}/>
                </div>
            </div>
        </section>
    );
};

export default PopupSignupWithSocials;
