// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import InfluencerContent from '../InfluencerContent';
import PresentationContent from '../PresentationContent';
import AuthContent from '../AuthContent';

const ConnectWithWallet = () => {
    const user = useSelector((state) => state.auth.user);
    const popupIsOpen = useSelector((state) => state.auth.popupIsOpen);

    return (
        <div className = { Styles.wrapper }>
            <Header />
            <main className = { Styles.main }>
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
