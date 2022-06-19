// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import ContentMeta from '../ContentMeta';
import ContentLogin from '../ContentLogin';

const ConnectWithWallet = () => {
    return (
        <div className = { Styles.wrapper }>
            <Header />
            <main className = { Styles.main }>
                <ContentMeta />
            </main>
        </div>
    );
};

const ConnectWithLogin = () => {
    return (
        <div className = { Styles.wrapper }>
            <Header login = 'login' />
            <main className = { Styles.main }>
                <ContentLogin />
            </main>
        </div>
    );
};

export { ConnectWithWallet, ConnectWithLogin };
