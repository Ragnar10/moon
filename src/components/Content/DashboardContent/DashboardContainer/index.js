// Core
import { useSelector } from 'react-redux';
// Mui
import {
    TabsUnstyled, TabsListUnstyled, TabUnstyled, TabPanelUnstyled,
} from '@mui/base';
// Styles
import Styles from './styles.module.scss';
// Images
import dashboard from '../../../../theme/assets/icons/dashboard.svg';
import affiliate from '../../../../theme/assets/icons/affiliate.svg';
import present from '../../../../theme/assets/icons/present.svg';
// Components
import Message from '../../../Message';
import DashboardHeader from '../DashboardHeader';
import Dashboard from '../Dashboard/DashboardBody';
import BonusRewards from '../BonusRewards';
import Info from '../Info';

export const DashboardContent = () => {
    const message = useSelector((state) => state.auth.message);

    return (
        <>
            { message && <Message class = { Styles.message }>{ message }</Message> }
            <section className = { Styles.dashboard_container }>
                <TabsUnstyled defaultValue = { 0 } className = { Styles.dashboard_tabs }>
                    <TabsListUnstyled className = { Styles.tabs_nav }>
                        <TabUnstyled className = { Styles.nav_item }>
                            <img src = { dashboard } alt = 'icon image' />
                            <span>{ 'Dashboard' }</span>
                        </TabUnstyled>
                        <TabUnstyled className = { Styles.nav_item }>
                            <img
                                src = { affiliate } className = { Styles.affiliate_img }
                                alt = 'icon image' />
                            <span>{ 'Affiliates' }</span>
                        </TabUnstyled>
                        <TabUnstyled className = { Styles.nav_item }>
                            <img src = { present } alt = 'icon image' />
                            <span>{ 'Bonus Rewards' }</span>
                        </TabUnstyled>
                    </TabsListUnstyled>
                    <div className = { Styles.tabs_content }>
                        <DashboardHeader />
                        <TabPanelUnstyled value = { 0 } className = { Styles.content_item }>
                            <Info />
                            <Dashboard fullFuncional = { false } />
                        </TabPanelUnstyled>
                        <TabPanelUnstyled value = { 1 } className = { Styles.content_item }>
                            <Dashboard fullFuncional = { true } />
                        </TabPanelUnstyled>
                        <TabPanelUnstyled value = { 2 } className = { Styles.content_item }>
                            <BonusRewards />
                        </TabPanelUnstyled>
                    </div>
                </TabsUnstyled>
            </section>
        </>
    );
};
