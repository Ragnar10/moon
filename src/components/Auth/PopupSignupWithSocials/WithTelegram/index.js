// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authWalletActions } from '../../../../actions/authWalletActions';
import { setTelegramData } from '../../../../reducers/authSocialSlice';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';
import TelegramLoginBtn from '../../TelegramLoginBtn';

const WithTelegram = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSocial.user);
    const wallet = useSelector((state) => state.authSocial.wallet);
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const telegramDescribe = useSelector((state) => state.authSocial.telegramDescribe);
    const loading = useSelector((state) => state.authSocial.loading);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res.username));

        localStorage.setItem('tg', res.username);
    };

    const telegramFollow = () => {
        const data = {
            username: telegramData,
        };
        dispatch(authWalletActions.checkTelegramFollow(data));
    };

    const updateUser = () => {
        const data = {
            id:     user.id,
            token:  user.token,
            update: {
                metamask:   wallet,
                twitter:    twitterData.username,
                twitter_id: twitterData.id,
                telegram:   telegramData,
            },
        };
        dispatch(authWalletActions.updateTelegramUser(data));
    };

    return (
        <>
            <h3 className = { Styles.content_title }>{ 'Connect your social media accounts' }</h3>
            <p className = { Styles.content_info }>
                { 'In order to qualify for the Free IDO please connect your twitter and telegram and follow us. This will allow us to track your activity and receive a higher Bonus.' }
            </p>
            <div className = { Styles.content_btns }>
                <div>
                    <TelegramLoginBtn
                        dataOnauth = { handleTelegramResponse }
                        botName = { process.env.REACT_APP_BOT_NAME }
                        requestAccess = 'white'
                        class = { telegramData ? Styles.telegram_disabled : null } />
                    <button
                        onClick = { () => telegramFollow() }
                        disabled = { !telegramData || telegramDescribe ? 'disabled' : null }
                        className = { Styles.follow_telegram_btn }>
                        <span />
                        <span>{ 'Join' }</span>
                    </button>
                </div>
                {
                    loading
                        ? <Loader />
                        : <button
                            disabled = { !telegramData || !telegramDescribe ? 'disabled' : null }
                            onClick = { () => updateUser() }
                            className = { Styles.next_btn }>{ !telegramData ? 'Waiting for accounts...' : 'Finish Setup' }</button>
                }
            </div>
        </>
    );
};

export default WithTelegram;

