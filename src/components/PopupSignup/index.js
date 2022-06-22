// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Instruments
import queryString from 'query-string';
// Utils
import { cutLine } from '../../utils';
// Actions
import { setTwitterData, setTelegramData } from '../../reducers/authSlice';
// Styles
import Styles from './styles.module.scss';
// Components
import Loader from '../Loader';
import Message from '../Message';
import TelegramLoginBtn from '../TelegramLoginBtn';

const PopupSignup = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const handleTelegramResponse = (res) => {
        dispatch(setTelegramData(res));
    };

    const apiPath = process.env.REACT_APP_SERVERLESS;

    const login = () => {
        (async () => {
            try {
                // OAuth Step 1
                const response = await fetch(`${apiPath}/twitter/oauth/request_token`, {
                    method:  'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const { oauth_token } = response.data;
                // Oauth Step 2
                window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
            } catch (errors) {
                console.error(errors);
            }
        })();
    };

    useEffect(() => {
        (async () => {
            const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

            if (oauth_token && oauth_verifier) {
                try {
                    // Oauth Step 3
                    await fetch(`${apiPath}/twitter/oauth/access_token`, {
                        method:  'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: { oauth_token, oauth_verifier },
                    });
                } catch (errors) {
                    console.error(errors);
                }
            }

            try {
                // Authenticated Resource Access
                const data = await fetch(`${apiPath}/twitter/users/profile_banner`, {
                    method:  'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log(data);
            } catch (errors) {
                console.error(errors);
            }
        })();
    }, []);

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
                    <button
                        onClick = { () => login() }
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
                        className = { Styles.confirm_btn }>{ 'Confirm' }</button>
                </div>
            </div>
        </section>
    );
};

export default PopupSignup;
