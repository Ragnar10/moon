// Core
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Routing
import {useNavigate} from 'react-router-dom';
// Instruments
import queryString from 'query-string';
// Actions
import {authWalletActions} from '../../../actions/authWalletActions';
// Styles
import Styles from './styles.module.scss';
// Components
import Message from '../../Message';
import {setStep} from "../../../reducers/authSocialSlice";
import {isMobileDevice} from '../../../utils'

export const PresentationContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const error = useSelector((state) => state.auth.error);
    const message = useSelector((state) => state.auth.message);

    const authTwitter = () => {
        const {oauth_token, oauth_verifier} = queryString.parse(window.location.search);

        if (oauth_token && oauth_verifier) {
            const data = {
                oauth_token,
                oauth_verifier,
            };

            dispatch(authWalletActions.getTwitterData(data));
        }
    };

    const initMetamask = () => {
        const {influencer, user_tg, user_token} = queryString.parse(window.location.search);
        localStorage.setItem('influencer', influencer);
        localStorage.setItem('tg', tg);
        const user = {
            token: user_token,
            id: user_id,
            telegram: user_tg
        }
        localStorage.setItem('user', user);
        localStorage.setItem('influencer', influencer);
        dispatch(setStep('three'));
    };

    useEffect(() => {
        const isMobile = isMobileDevice()
        const inf = localStorage.getItem('influencer');
        if (isMobile && !inf) {
            return initMetamask();
        } else {
            return authTwitter();
        }
    }, []);

    useEffect(() => {
        const influencer = localStorage.getItem('influencer');

        if (twitterData.username) {
            navigate(`/affiliate/${influencer}`, {replace: true});
        }
    }, [twitterData]);

    return (
        <>
            {error && <Message>{error}</Message>}
            {message && <Message class={Styles.message}>{message}</Message>}
            <section className={Styles.content}>
                <h1 className={Styles.content_connected_title}>{'We ‘re preparing to launch'}</h1>
                <p className={Styles.content_info}>
                    <span>{'Our team is working very hard to make leveraged ready for launch.'}</span>
                    <span>{'Don’t want to miss out on updates? Follow our social medias.'}</span>
                </p>
                <div className={Styles.content_socials}>
                    <a
                        href={'https://bit.ly/LVRGD_public'}
                        target='_blank'
                        rel='noreferrer'
                        className={Styles.content_connected_btn}>{'Public Deck'}</a>
                    <a
                        href={'https://leveraged-group.gitbook.io/leveraged.io/'}
                        target='_blank'
                        rel='noreferrer'
                        className={Styles.content_connected_btn}>{'White Paper'}</a>
                </div>
            </section>
        </>
    );
};
