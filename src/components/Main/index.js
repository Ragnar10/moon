// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';


const Main = () => {
    return (
        <div className = { Styles.container }>
            <div className = { Styles.wrapper }>
                <Header />
                <main className = { Styles.main }>
                    <Content />
                </main>
            </div>
            <Footer />
            <div className = { Styles.background } />
        </div>
    );
};

export default Main;
