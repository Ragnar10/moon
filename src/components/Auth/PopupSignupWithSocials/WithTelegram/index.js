// Core
import {useDispatch, useSelector} from 'react-redux';
// Actions
import {authWalletActions} from '../../../../actions/authWalletActions';
import {setStep, setTelegramData} from '../../../../reducers/authSocialSlice';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';
import TelegramLoginBtn from '../../TelegramLoginBtn';

const WithTelegram = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.authSocial.influencer);
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const telegramDescribe = useSelector((state) => state.authSocial.telegramDescribe);
    const loading = useSelector((state) => state.authSocial.loading);

    const handleTelegramResponse = (res) => {
        const tgUserName = res.username || res.id
        dispatch(setTelegramData(tgUserName));
        localStorage.setItem('tg', tgUserName);
    };

    const saveUser = () => {
        if (telegramDescribe) {
            const data = {
                telegram: telegramData,
                ref: influencer,
            };
            dispatch(authWalletActions.createTelegramUser(data));
        } else {
            const data = {
                username: telegramData,
            };
            dispatch(authWalletActions.checkTelegramFollow(data));
        }
    };

    const isSubscribe = telegramDescribe ? 'Next step' : 'Check subscription';
    const nextBtn = telegramDescribe ? `${Styles.next_btn} ${Styles.next_btn_available}` : Styles.next_btn;

    return (
        <>
            <h3 className={Styles.content_title}>{'Connect your social media accounts'}</h3>
            <p className={Styles.content_info}>
                {'In order to qualify for the Free IDO please connect your twitter and telegram and follow us. This will allow us to track your activity and receive a higher Bonus.'}
            </p>
            <div className={Styles.content_btns}>
                <div className={Styles.btns_telegram}>
                    <TelegramLoginBtn
                        dataOnauth={handleTelegramResponse}
                        botName={process.env.REACT_APP_BOT_NAME}
                        requestAccess='white'
                        class={telegramData ? Styles.telegram_disabled : null}/>
                    <a
                        href={'https://t.me/lvrgd'}
                        target={'_blank'}
                        rel='noreferrer'
                        className={Styles.follow_telegram_btn}>
                        <span/>
                        <span>{'Join'}</span>
                    </a>
                </div>
                {
                    loading
                        ? <Loader/>
                        : <button
                            disabled={!telegramData ? 'disabled' : null}
                            onClick={() => saveUser()}
                            className={nextBtn}>
                            {!telegramData ? 'Waiting for accounts...' : isSubscribe}</button>
                }
            </div>
        </>
    );
};

export default WithTelegram;

