// Core
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authActions } from '../../actions';
// Utils
import { cutLine } from '../../utils';
// Styles
import Styles from './styles.module.scss';
// Components
import Loader from '../Loader';
import Message from '../Message';

const PopupSignup = (props) => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    return (
        <section className = { Styles.popup }>
            <div className = { Styles.shadow } />
            <div className = { Styles.popup_content }>
                <h3 className = { Styles.content_title }>{ `Congratulations, ${cutLine(wallet, 12)} !` }</h3>
                <p className = { Styles.content_info }>
                    { 'You have successfully been referred by: Influencer Name and you will receive a special Bonus at LVRGD Launch.' }
                </p>
                <p className = { Styles.content_info }>
                    { 'To be eligible for the Bonus connect your twitter and telegram to verify you are a real Human. Collect social points for the free IDO by being active on Telegram and Twitter.' }
                </p>
                <div className = { Styles.content_btns }>
                    <button className = { Styles.twitter_btn }>
                        <span />
                        <span>{ 'Twitter' }</span>
                    </button>
                    <button className = { Styles.telegram_btn }>
                        <span />
                        <span>{ 'Telegram' }</span>
                    </button>
                    <button
                        disabled
                        className = { Styles.confirm_btn }>{ 'Confirm' }</button>
                </div>
            </div>
        </section>
    );
};

export default PopupSignup;
