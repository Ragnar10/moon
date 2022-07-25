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
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const loading = useSelector((state) => state.authSocial.loading);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res.username));

        localStorage.setItem('tg', res.username);
    };

    const updateUser = () => {
        dispatch(authWalletActions.updateUser(telegramData));
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
                        disabled = { !telegramData ? 'disabled' : null }
                        className = { Styles.follow_telegram_btn }>
                        <span />
                        <span>{ 'Join' }</span>
                    </button>
                </div>
                {
                    loading
                        ? <Loader />
                        : <button
                            disabled = { !telegramData ? 'disabled' : null }
                            onClick = { () => updateUser() }
                            className = { Styles.next_btn }>{ !telegramData ? 'Waiting for accounts...' : 'Finish Setup' }</button>
                }
            </div>
        </>
    );
};

export default WithTelegram;

