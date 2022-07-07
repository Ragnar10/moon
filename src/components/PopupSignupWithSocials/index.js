// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { cutLine, nameTransform } from '../../utils';
// Actions
import { authActions } from '../../actions/authActions';
import { setTelegramData, setTwitterData } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import TelegramLoginBtn from '../TelegramLoginBtn';
import Message from '../Message';

const PopupSignupWithSocials = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.auth.influencer);
    const user = useSelector((state) => state.auth.user);
    const wallet = useSelector((state) => state.auth.wallet);
    const twitterData = useSelector((state) => state.auth.twitterData);
    const telegramData = useSelector((state) => state.auth.telegramData);
    const error = useSelector((state) => state.auth.error);
    const message = useSelector((state) => state.auth.message);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res.username));

        localStorage.setItem('tg', res.username);
    };

    const twitterLogin = () => {
        dispatch(authActions.getTwitterOauthToken());
    };

    useEffect(() => {
        const tg = localStorage.getItem('tg');

        if (tg) return  dispatch(setTelegramData(tg));
    }, []);

    useEffect(() => {
        const tw = localStorage.getItem('tw');

        if (tw) return  dispatch(setTwitterData(tw));
    }, []);

    const confirmAllData = () => {
        if (wallet && twitterData && telegramData && influencer) {
            const data = {
                metamask: wallet,
                ref:      influencer,
                twitter:  twitterData,
                telegram: telegramData,
            };

            dispatch(authActions.createUser(data));
        }
    };

    useEffect(() => {
        let timeout;

        if (user.token) {
            timeout = setTimeout(() => {
                window.location.href = process.env.REACT_APP_BASE_PATH;
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [user]);

    return (
        <section className = { Styles.popup }>
            <div className = { Styles.shadow } />
            { error && <Message>{ error }</Message> }
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ `Congratulations, ${cutLine(wallet, 12)} !` }</h3>
                <p className = { Styles.content_info }>
                    { `You have successfully been referred by: ${nameTransform(influencer)}
                     and you will receive a special Bonus at LVRGD Launch.` }
                </p>
                <p className = { Styles.content_info }>
                    { 'To be eligible for the Bonus connect your twitter and telegram to verify you are a real Human. Collect social points for the free IDO by being active on Telegram and Twitter.' }
                </p>
                <div className = { Styles.content_btns }>
                    <button
                        onClick = { () => twitterLogin() }
                        disabled = { twitterData ? 'disabled' : null }
                        className = { Styles.twitter_btn }>
                        <span />
                        <span>{ 'Twitter' }</span>
                    </button>
                    <TelegramLoginBtn
                        dataOnauth = { handleTelegramResponse }
                        botName = { process.env.REACT_APP_BOT_NAME }
                        requestAccess = 'white'
                        class = { telegramData ? Styles.telegram_disabled : null } />
                    <button
                        disabled = { !wallet || !twitterData || !telegramData ? 'disabled' : null }
                        onClick = { () => confirmAllData() }
                        className = { Styles.confirm_btn }>{ 'Confirm' }</button>
                </div>
            </div>
        </section>
    );
};

export default PopupSignupWithSocials;
