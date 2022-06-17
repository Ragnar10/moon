// Styles
import Styles from './styles.module.scss';
// Components
import Footer from '../Footer';

const Main = (props) => {
    return (
        <div className = { Styles.container }>
            { props.children }
            <Footer />
            <div className = { Styles.background } />
        </div>
    );
};

export { Main };
