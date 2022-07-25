// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { authWalletActions } from '../../../../actions/authWalletActions';
import { setStep } from '../../../../reducers/authSocialSlice';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';

const WithTwitter = () => {
    const dispatch = useDispatch();
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const loading = useSelector((state) => state.authSocial.loading);

    const twitterLogin = () => {
        dispatch(authWalletActions.getTwitterOauthToken());
    };

    const updateUser = () => {
        dispatch(authWalletActions.updateUser(twitterData));
        dispatch(setStep('three'));
    };

    return (
        <>
            <h3 className = { Styles.content_title }>{ 'Connect your social media accounts' }</h3>
            <p className = { Styles.content_info }>
                { 'In order to qualify for the Free IDO please connect your twitter and telegram and follow us. This will allow us to track your activity and receive a higher Bonus.' }
            </p>
            <div className = { Styles.content_btns }>
                <div>
                    <button
                        onClick = { () => twitterLogin() }
                        disabled = { twitterData ? 'disabled' : null }
                        className = { Styles.twitter_btn }>
                        <span />
                        <span>{ 'Twitter' }</span>
                    </button>
                    <button
                        onClick = { () => twitterLogin() }
                        disabled = { !twitterData ? 'disabled' : null }
                        className = { Styles.follow_twitter_btn }>
                        <span />
                        <span>{ 'Follow' }</span>
                    </button>
                </div>
                {
                    loading
                        ? <Loader />
                        : <button
                            disabled = { !twitterData ? 'disabled' : null }
                            onClick = { () => updateUser() }
                            className = { Styles.next_btn }>{ !twitterData ? 'Waiting for accounts...' : 'Next step' }</button>
                }
            </div>
        </>
    );
};

export default WithTwitter;

