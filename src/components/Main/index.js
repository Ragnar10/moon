// Styles
import Styles from './styles.module.scss';
// Components
import Footer from '../Footer';
import Header from '../Header';

const Main = (props) => {
    const bgClass = props.auth === 'signup' ? Styles.background_signup : Styles.background;

    return (
        <div className = { Styles.container }>
            <div className = { Styles.wrapper }>
                <Header auth = { props.auth } />
                <main className = { Styles.main }>
                    { props.children }
                </main>
            </div>
            <Footer />
            <div className = { bgClass } />
        </div>
    );
};

export { Main };
