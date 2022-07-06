// Core
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Routing
import { Link } from 'react-router-dom';
// Actions
import { setUser } from '../../reducers/signupSlice';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components
import Nav from '../Nav';

const Header = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.signup.user);

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem('access'));

        if (data && data.access) {
            dispatch(setUser(data));
        }
    }, []);

    const headerClass = props.auth === 'signup' ? Styles.header_signup : Styles.header;

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
                props.auth === 'auth' && !user.access && <Link to = '/login' className = { Styles.header_btn_login }>{ 'Login' }</Link>
            }
        </header>
    );
};

export default Header;
