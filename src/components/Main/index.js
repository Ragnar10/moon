// Styles
import Styles from './styles.module.scss';
// Components
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';


const Main = () => {
    return (
        <div className = { Styles.container }>
            <Header />
            <main className = { Styles.main }>
                <Content />
            </main>
            <Footer />
        </div>
    );
};

export default Main;
