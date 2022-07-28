// Core
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authWalletActions } from '../../../../actions/authWalletActions';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';

const WithTwitter = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authSocial.user);
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const twitterDescribe = useSelector((state) => state.authSocial.twitterDescribe);
    const loading = useSelector((state) => state.authSocial.loading);

    const twitterLogin = () => {
        dispatch(authWalletActions.getTwitterOauthToken());
    };

    const updateUser = () => {
        if (twitterDescribe) {
            const data = {
                meta:   user.metamask,
                token:  user.token,
                update: {
                    twitter:    twitterData.username,
                    twitter_id: twitterData.id,
                },
            };
            dispatch(authWalletActions.updateTwitterUser(data));
        } else {
            const data = {
                twitter_id: twitterData.id,
            };
            dispatch(authWalletActions.checkTwitterFollow(data));
        }
    };

    const isSubscribe = twitterDescribe ? 'Next step' : 'Check subscription';
    const nextBtn = twitterDescribe ? `${Styles.next_btn} ${Styles.next_btn_available}` : Styles.next_btn;

    return (
        <>
            <h3 className = { Styles.content_title }>{ 'Connect your social media accounts' }</h3>
            <p className = { Styles.content_info }>
                { 'In order to qualify for the Free IDO please connect your twitter and telegram and follow us. This will allow us to track your activity and receive a higher Bonus.' }
            </p>
            <div className = { Styles.content_btns }>
                <div className = { Styles.btns_twitter }>
                    <button
                        onClick = { () => twitterLogin() }
                        disabled = { twitterData.username ? 'disabled' : null }
                        className = { Styles.twitter_btn }>
                        <span />
                        <span>{ 'Twitter' }</span>
                    </button>
                    <a
                        href = { 'https://twitter.com/LeveragedIO' }
                        target = { '_blank' }
                        rel = 'noreferrer'
                        className = { Styles.follow_twitter_btn }>
                        <span />
                        <span>{ 'Follow' }</span>
                    </a>
                </div>
                {
                    loading
                        ? <Loader />
                        : <button
                            disabled = { !twitterData.username ? 'disabled' : null }
                            onClick = { () => updateUser() }
                            className = { nextBtn }>
                            { !twitterData.username ? 'Waiting for accounts...' : isSubscribe }</button>
                }
            </div>
        </>
    );
};

export default WithTwitter;

