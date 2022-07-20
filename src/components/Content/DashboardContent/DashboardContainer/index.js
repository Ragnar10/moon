// Core
import { useSelector } from 'react-redux';
// Mui
import {
    TabsUnstyled, TabsListUnstyled, TabUnstyled, TabPanelUnstyled,
} from '@mui/base';
// Styles
import Styles from './styles.module.scss';
// Images

// Components
import Message from '../../../Message';

export const DashboardContent = () => {
    const message = useSelector((state) => state.auth.message);

    return (
        <>
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <section className = { Styles.dashboard_container }>
                <TabsUnstyled defaultValue = { 0 } className = { Styles.dashboard_tabs }>
                    <TabsListUnstyled className = { Styles.tabs_nav }>
                        <TabUnstyled className = { Styles.nav_item }>Dashboard</TabUnstyled>
                        <TabUnstyled className = { Styles.nav_item }>Affiliates</TabUnstyled>
                        <TabUnstyled className = { Styles.nav_item }>Bonus Rewards</TabUnstyled>
                    </TabsListUnstyled>
                    <div className = { Styles.tabs_content }>
                        <TabPanelUnstyled value = { 0 } className = { Styles.content_item }>
                            Dashboard
                        </TabPanelUnstyled>
                        <TabPanelUnstyled value = { 1 } className = { Styles.content_item }>
                            Affiliates
                        </TabPanelUnstyled>
                        <TabPanelUnstyled value = { 2 } className = { Styles.content_item }>
                            Bonus Rewards
                        </TabPanelUnstyled>
                    </div>
                </TabsUnstyled>
            </section>
        </>
    );
};
