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
                props.auth === 'auth'
                && <div className = { Styles.header_nav }>
                    <Link to = '/signup' className = { Styles.header_btn_signup }>{ 'Sign up' }</Link>
                    <Link to = '/login' className = { Styles.header_btn_login }>{ 'Login' }</Link>
                </div>
            }
        </header>
    );
};

export default Header;
