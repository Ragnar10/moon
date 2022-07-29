// Core
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
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const telegramDescribe = useSelector((state) => state.authSocial.telegramDescribe);
    const loading = useSelector((state) => state.authSocial.loading);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res.username));

        localStorage.setItem('tg', res.username);
    };

    const updateUser = () => {
        if (telegramDescribe) {
            const data = {
                meta:   user.metamask,
                token:  user.token,
                update: {
                    telegram: telegramData,
                },
            };
            dispatch(authWalletActions.updateTelegramUser(data));
        } else {
            const data = {
                username: telegramData,
            };
            dispatch(authWalletActions.checkTelegramFollow(data));
        }
    };

    const isSubscribe = telegramDescribe ? 'Finish Setup' : 'Check subscription';
    const nextBtn = telegramDescribe ? `${Styles.next_btn} ${Styles.next_btn_available}` : Styles.next_btn;

    return (
        <>
            <h3 className = { Styles.content_title }>{ 'Connect your social media accounts' }</h3>
            <p className = { Styles.content_info }>
                { 'In order to qualify for the Free IDO please connect your twitter and telegram and follow us. This will allow us to track your activity and receive a higher Bonus.' }
            </p>
            <div className = { Styles.content_btns }>
                <div className = { Styles.btns_telegram }>
                    <TelegramLoginBtn
                        dataOnauth = { handleTelegramResponse }
                        botName = { process.env.REACT_APP_BOT_NAME }
                        requestAccess = 'white'
                        class = { telegramData ? Styles.telegram_disabled : null } />
                    <a
                        href = { 'https://t.me/lvrgd' }
                        target = { '_blank' }
                        rel = 'noreferrer'
                        className = { Styles.follow_telegram_btn }>
                        <span />
                        <span>{ 'Join' }</span>
                    </a>
                </div>
                {
                    loading
                        ? <Loader />
                        : <button
                            disabled = { !telegramData ? 'disabled' : null }
                            onClick = { () => updateUser() }
                            className = { nextBtn }>{ !telegramData ? 'Waiting for accounts...' : isSubscribe }</button>
                }
            </div>
        </>
    );
};

export default WithTelegram;

