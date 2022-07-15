// Core
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Routing
import { Link, useNavigate } from 'react-router-dom';
// Utils
import { deleteCookie, getCookie } from '../../utils';
// Actions
import { setAccess } from '../../reducers/authSlice';
import { authActions } from '../../actions/authActions';
// Styles
import Styles from './styles.module.scss';
// Images
import logo from '../../theme/assets/images/logo.svg';
// Components
import Nav from '../Nav';

const Header = (props) => {
    const dispatch = useDispatch();
    const access = useSelector((state) => state.auth.access);

    const navigate = useNavigate('/');

    useEffect(() => {
        const refresh = getCookie('refresh');

        if (refresh) {
            const data = {
                refresh,
            };
            dispatch(authActions.refreshLogin(data));
        }
    }, []);

    const logout = () => {
        dispatch(setAccess({}));
        deleteCookie('refresh');
        navigate('/');
    };

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
                (props.auth === 'auth' || props.auth === 'signup') && !access.access
                    ? <Link to = '/login' className = { Styles.header_btn_login }>{ 'Affiliate login' }</Link>
                    : <button onClick = { () => logout() } className = { Styles.header_btn_login }>{ 'Logout' }</button>
            }
        </header>
    );
};

export default Header;
