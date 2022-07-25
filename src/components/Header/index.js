// Core
import { useSelector } from 'react-redux';
// Routing
import { Link } from 'react-router-dom';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/main/logo.svg';
// Components
import Nav from '../Nav';

const Header = (props) => {
    const access = useSelector((state) => state.auth.access);

    const headerClass = props.auth === 'signup' ? Styles.header_signup : Styles.header;

    const loginBtn = (props.auth === 'auth' || props.auth === 'signup') && !access.access
        ? <Link to = '/login' className = { Styles.header_btn_login }>{ 'Affiliate login' }</Link>
        : null;

    return (
        <header className = { headerClass }>
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
                props.auth !== 'wallet' ? loginBtn : null
            }
        </header>
    );
};

export default Header;
