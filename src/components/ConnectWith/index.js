// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import InfluencerContent from '../InfluencerContent';
import PresentationContent from '../PresentationContent';
import AuthContent from '../AuthContent';
import Message from '../Message';

const ConnectWithWallet = () => {
    const user = useSelector((state) => state.auth.user);
    const popupIsOpen = useSelector((state) => state.auth.popupIsOpen);
    const error = useSelector((state) => state.auth.error);

    return (
        <div className = { Styles.wrapper }>
            <Header />
            <main className = { Styles.main }>
                { error && <Message class = { Styles.message_success }>{ error }</Message> }
                {
                    user.metamask && user.twitter && user.telegram && !popupIsOpen
                        ? <PresentationContent /> : <InfluencerContent />
                }
            </main>
        </div>
    );
};

const ConnectWithAuth = () => {
    return (
        <div className = { Styles.wrapper }>
            <Header auth = 'auth' />
            <main className = { Styles.main }>
                <AuthContent />
            </main>
        </div>
    );
};

export { ConnectWithWallet, ConnectWithAuth };
