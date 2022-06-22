// Styles
import Styles from './styles.module.scss';

const Nav = (props) => {
    return (
        <nav className = { `${Styles.nav} ${props.class}` }>
            <ul>
                <li>
                    <a href = { '#' }>{ 'FAQ' }</a>
                </li>
                <li>
                    <a href = { '#' }>{ 'Security' }</a>
                </li>
                <li>
                    <a href = { '#' }>{ 'Developers' }</a>
                </li>
                <li>
                    <a href = { '#' }>{ 'Whitepaper' }</a>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
