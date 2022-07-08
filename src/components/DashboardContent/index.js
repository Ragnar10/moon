// Core
import { useSelector } from 'react-redux';
// Styles
import Styles from './styles.module.scss';
// Images
import dashboard from '../../theme/assets/images/dashboard_bg.jpeg';
// Components
import Message from '../Message';

export const DashboardContent = () => {
    const message = useSelector((state) => state.auth.message);

    return (
        <>
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <section className = { Styles.content }>
                <div>Coming soon...</div>
                <img src = { dashboard } alt = 'dashboard image' />
            </section>
        </>
    );
};
