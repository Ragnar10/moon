// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import Content from '../Content';

const ConnectWithWallet = () => {
    return (
        <div className = { Styles.wrapper }>
            <Header />
            <main className = { Styles.main }>
                <Content />
            </main>
        </div>
    );
};

const ConnectWithLogin = () => {
    return (
        <div className = { Styles.wrapper }>
            <Header login = 'login' />
            <main className = { Styles.main }>
                <Content login = 'login' />
            </main>
        </div>
    );
};

export { ConnectWithWallet, ConnectWithLogin };
