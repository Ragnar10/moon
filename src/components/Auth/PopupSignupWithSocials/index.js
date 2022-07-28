// Core
import { useSelector } from 'react-redux';
import Styles from './styles.module.scss';
// Components
import Message from '../../Message';
import WithMetamask from './WithMetamask';
 import WithTwitter from './WithTwitter';
import WithTelegram from './WithTelegram';

const PopupSignupWithSocials = () => {
    const user = useSelector((state) => state.authSocial.user);
    const wallet = useSelector((state) => state.authSocial.wallet);
    const twitterData = useSelector((state) => state.authSocial.twitterData);
    const step = useSelector((state) => state.authSocial.step);
    const error = useSelector((state) => state.authSocial.error);
    const message = useSelector((state) => state.authSocial.message);

    const stepsTwoClass = user.metamask || step === 'two' ? `${Styles.steps_two} ${Styles.wallet_ready}` : Styles.steps_two;
    const stepsThreeClass = user.twitter || step === 'three' ? `${Styles.steps_three} ${Styles.wallet_ready}` : Styles.steps_three;

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
