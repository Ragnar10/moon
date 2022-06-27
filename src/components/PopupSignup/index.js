// Core
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { cutLine } from '../../utils';
// Actions
import { authActions } from '../../actions';
import { setTelegramData } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import TelegramLoginBtn from '../TelegramLoginBtn';
import Message from '../Message';

const PopupSignup = (props) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const error = useSelector((state) => state.auth.error);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res));
    };

    const twitterLogin = () => {
        dispatch(authActions.getTwitterOauthToken());
    };

    const confirmAllData = () => {
        props.setToggle(true);
    };

    return (
        <section className = { Styles.popup }>
            <div className = { Styles.shadow } />
            { error && <Message>{ error }</Message> }
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ `Congratulations, ${cutLine(wallet, 12)} !` }</h3>
                <p className = { Styles.content_info }>
                    { 'You have successfully been referred by: Influencer Name and you will receive a special Bonus at LVRGD Launch.' }
                </p>
                <p className = { Styles.content_info }>
                    { 'To be eligible for the Bonus connect your twitter and telegram to verify you are a real Human. Collect social points for the free IDO by being active on Telegram and Twitter.' }
                </p>
                <div className = { Styles.content_btns }>
                    <button
                        onClick = { () => twitterLogin() }
                        className = { Styles.twitter_btn }>
                        <span />
                        <span>{ 'Twitter' }</span>
                    </button>
                    <TelegramLoginBtn
                        dataOnauth = { handleTelegramResponse }
                        botName = { process.env.REACT_APP_BOT_NAME }
                        requestAccess = 'white' />
                    <button
                        disabled
                        onClick = { () => confirmAllData() }
                        className = { Styles.confirm_btn }>{ 'Confirm' }</button>
                </div>
            </div>
        </section>
    );
};

export default PopupSignup;
