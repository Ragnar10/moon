// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { nameTransform } from '../../../../utils';
// Actions
import { authWalletActions } from '../../../../actions/authWalletActions';
import { setStep } from '../../../../reducers/authSocialSlice';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';

const WithMetamask = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.authSocial.influencer);
    const wallet = useSelector((state) => state.authSocial.wallet);
    const loading = useSelector((state) => state.authSocial.loading);

    const isMobileDevice = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    };

    useEffect(() => {
        if (isMobileDevice()) return dispatch(authWalletActions.connectMetaMobile());
    }, []);

    const connectMetamask = () => {
        dispatch(authWalletActions.connectMeta());
    };

    const saveUser = () => {
        const data = {
            metamask: wallet + Date.now(),
            ref:      influencer,
        };
        dispatch(authWalletActions.createMetamaskUser(data));
    };

    const metaBtn = isMobileDevice() && !wallet
        ?  <a
            href = { `https://metamask.app.link/dapp/${process.env.REACT_APP_METAMASK_API_PATH}` }
            className = { Styles.connect_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            disabled = { wallet ? 'disabled' : null }
            className = { Styles.connect_metamask_btn }>{ 'Connect Metamask' }</button>;

    return (
        <>
            <h3 className = { Styles.content_title }>{ 'Lets setup your account' }</h3>
            <p className = { Styles.content_info }>
                { `You have successfully been referred by: ${nameTransform(influencer)}
                     and you will receive a special Bonus at LVRGD Launch.` }
            </p>
            <div className = { Styles.content_btns }>
                { loading ? <Loader /> : metaBtn }
                {
                    loading && wallet
                        ? <Loader />
                        : <button
                            disabled = { !wallet ? 'disabled' : null }
                            onClick = { () => saveUser() }
                            className = { Styles.next_btn }>{ !wallet ? 'Waiting for accounts...' : 'Next step' }</button>
                }
            </div>
        </>
    );
};

export default WithMetamask;
