// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { nameTransform, isMobileDevice } from '../../../../utils';
// Actions
import { authWalletActions } from '../../../../actions/authWalletActions';
// Styles
import Styles from '../styles.module.scss';
// Components
import Loader from '../../../Loader';
import {setStep} from "../../../../reducers/authSocialSlice";

const WithMetamask = () => {
    const dispatch = useDispatch();
    const influencer = useSelector((state) => state.authSocial.influencer);
    const user = useSelector((state) => state.authSocial.user);
    const wallet = useSelector((state) => state.authSocial.wallet);
    const data = useSelector((state) => state.authSocial.twitter)
    const loading = useSelector((state) => state.authSocial.loading);

    useEffect(() => {
        if (isMobileDevice()) {

            return dispatch(authWalletActions.connectMetaMobile());
        }
    }, []);

    const connectMetamask = () => {
        dispatch(setStep('Finish Setup'))
        dispatch(authWalletActions.connectMeta());
    };


    const updateUser = () => {
            const data = {
                meta:   user.telegram,
                token:  user.token,
                update: {
                    metamask: wallet,
                },
            };

            dispatch(authWalletActions.updateMetamaskUser(data));
    };

    const walletConnect = wallet ? 'Finish Setup' : 'Check subscription';

    const metaBtn = isMobileDevice() && !wallet
        ?  <a
            href = { `https://metamask.app.link/dapp/${process.env.REACT_APP_METAMASK_API_PATH}?tw=${data.twitter}` }
            className = { Styles.connect_metamask_btn }>{ 'Connect Metamask' }</a>
        : <button
            onClick = { () => connectMetamask() }
            disabled = { wallet ? 'disabled' : null }
            className = { Styles.connect_metamask_btn }>{ 'Connect Metamask' }</button>;

    const nextBtn = wallet ? `${Styles.next_btn} ${Styles.next_btn_available}` : Styles.next_btn;

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
                            onClick = { () => updateUser() }
                            className = { nextBtn }>{ !wallet ? 'Waiting for accounts...' : walletConnect }</button>
                }
            </div>
        </>
    );
};

export default WithMetamask;
