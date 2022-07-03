// Styles
import Styles from './styles.module.scss';
// Components
import Footer from '../Footer';
import Header from '../Header';

const Main = (props) => {
    return (
        <div className = { Styles.container }>
            <div className = { Styles.wrapper }>
                <Header auth = { props.auth } />
                <main className = { Styles.main }>
                    { props.children }
                </main>
            </div>
            <Footer />
            <div className = { Styles.background } />
        </div>
    );
};

export { Main };
