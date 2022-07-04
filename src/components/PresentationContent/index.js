// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
// Instruments
import queryString from 'query-string';
// Actions
import { authActions } from '../../actions';
// Styles
import Styles from './styles.module.scss';

export const PresentationContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const twitterData = useSelector((state) => state.auth.twitterData);

    const authTwitter = () => {
        const { oauth_token, oauth_verifier } = queryString.parse(window.location.search);

        if (oauth_token && oauth_verifier) {
            const data = {
                oauth_token,
                oauth_verifier,
            };

            dispatch(authActions.getTwitterData(data));
        }
    };

    useEffect(() => {
        const tw = localStorage.getItem('tw');
        if (!tw) return authTwitter();
    }, []);

    useEffect(() => {
        const influencer = localStorage.getItem('influencer');

        if (twitterData) {
            navigate(`/affiliate/${influencer}`, { replace: true });
        }
    }, [twitterData]);

    return (
        <section className = { Styles.content }>
            <h1 className = { Styles.content_connected_title }>{ 'We ‘re preparing to launch' }</h1>
            <p className = { Styles.content_info }>
                <span>{ 'Welcome to Referral Page of The Moon Carl.' }</span>
                <span>{ 'To receive a special Bonus at LVRGD Launch please connect your Meta mask!' }</span>
            </p>
            <a
                href = { 'https://bit.ly/LVRGD_public' }
                target = '_blank'
                rel = 'noreferrer'
                className = { Styles.content_connected_btn }>{ 'Investor Deck' }</a>
        </section>
    );
};
