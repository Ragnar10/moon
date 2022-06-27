// Core
import { useDispatch, useSelector } from 'react-redux';
// Instruments
import queryString from 'query-string';
// Actions
import { useEffect, useState } from 'react';
import { authActions } from '../../actions';
// Styles
import Styles from './styles.module.scss';
// Components
import PopupSignup from '../PopupSignup';
import Loader from '../Loader';
import Message from '../Message';

const ContentMeta = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.auth.wallet);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    const [success, setSuccess] = useState(false);

    const apiPath = 'http://localhost:4000/api';

    const auth = () => {
        const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

        if (oauth_token && oauth_verifier) {
            const data = {
                req_oauth_token: oauth_token,
                oauth_verifier,
            };

            try {
                // Oauth Step 3
                fetch(`${apiPath}/twitter/oauth/access_token`, {
                    method:  'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((resp) => resp.json())
                    .then((res) => setSuccess(res.success))
                    .catch((errors) => console.log(errors));

                console.log(oauth_token, oauth_verifier);
            } catch (errors) {
                console.error(errors);
            }
        } else {
            console.log('Error');
        }
    };

    const getData = () => {
        try {
            fetch(`${apiPath}/twitter/users/profile_banner`, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                })
                .catch((errors) => console.log(errors));
        } catch (errors) {
            console.error(errors);
        }
    };

    useEffect(() => {
        auth();
    }, []);

    useEffect(() => {
        if (success) return getData();
    }, [success]);

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authActions.connectMetaMobile());
    }, []);

    const baseUrl = 'lvrgd-moon.web.app';
    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${baseUrl}`;

    const metaBtn = isMobileDevice()
        ? <a
            href = { metamaskAppDeepLink }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => dispatch(authActions.connectMeta()) }
            className = { Styles.content_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            { wallet && <PopupSignup /> }
            { error && <Message>{ error }</Message> }
            <section className = { Styles.content }>
                <h1 className = { Styles.content_title }>
                    <span>{ 'Leveraged' }</span>
                    <span>{ 'x' }</span>
                    <span>{ 'Moon Carl' }</span>
                </h1>
                <p className = { Styles.content_info }>
                    <span>{ 'Welcome to Referral Page of The Moon Carl.' }</span>
                    <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
                </p>
                {
                    loading
                        ? <Loader />
                        : metaBtn
                }
            </section>
        </>
    );
};

export default ContentMeta;
