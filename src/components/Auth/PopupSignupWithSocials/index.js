// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Routing
import { useNavigate } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Components
import Message from '../../Message';
import WithMetamask from './WithMetamask';
import WithTwitter from './WithTwitter';
import WithTelegram from './WithTelegram';

const PopupSignupWithSocials = () => {
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state.authSocial.wallet);
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const telegramData = useSelector((state) => state.authSocial.telegramData);
    const step = useSelector((state) => state.authSocial.step);
    const error = useSelector((state) => state.authSocial.error);
    const message = useSelector((state) => state.authSocial.message);

    const navigate = useNavigate();

    useEffect(() => {
        if (wallet && twitterData && telegramData) {
            navigate('/');
        }
    }, [wallet, twitterData, telegramData]);

    const stepsTwoClass = wallet || step === 'two' ? `${Styles.steps_two} ${Styles.wallet_ready}` : Styles.steps_two;
    const stepsThreeClass = twitterData  || step === 'three' ? `${Styles.steps_three} ${Styles.wallet_ready}` : Styles.steps_three;

    return (
        <section className = { Styles.popup }>
            <div className = { Styles.shadow } />
            { error && <Message>{ error }</Message> }
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <div className = { Styles.popup_content }>
                { step === 'one' && <WithMetamask /> }
                { step === 'two' && wallet && <WithTwitter /> }
                { step === 'three' && wallet && twitterData && <WithTelegram /> }
                <div className = { Styles.steps }>
                    <span className = { Styles.steps_one } />
                    <span className = { stepsTwoClass } />
                    <span className = { stepsThreeClass } />
                </div>
            </div>
        </section>
    );
};

export default PopupSignupWithSocials;
