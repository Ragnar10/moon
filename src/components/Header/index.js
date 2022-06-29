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
                <img src = { logo } alt = 'logo' />
            </div>
            {
                props.auth
                    && <div className = { Styles.header_nav }>
                        <Nav />
                        <button className = { Styles.header_btn_launch }>{ 'Launch application' }</button>
                    </div>
            }
            { /* { */ }
            { /*     props.login && <button */ }
            { /*         onClick = { () => setToggle(true) } */ }
            { /*         className = { Styles.header_btn_login }>{ 'Login' }</button> */ }
            { /* } */ }
        </header>
    );
};

export default Header;
