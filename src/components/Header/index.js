// Routing
import { Link } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components
import Nav from '../Nav';

const Header = (props) => {
    return (
        <header className = { Styles.header }>
            <div className = { Styles.header_logo }>
                <Link to = '/'>
                    <img src = { logo } alt = 'logo' />
                </Link>
            </div>
            {
                props.auth === 'authorized'
                    && <div className = { Styles.header_nav }>
                        <Nav />
                        <button className = { Styles.header_btn_launch }>{ 'Launch application' }</button>
                    </div>
            }
            {
                props.auth === 'login' && <Link to = '/login' className = { Styles.header_btn_login }>{ 'Login' }</Link>
            }
        </header>
    );
};

export default Header;
