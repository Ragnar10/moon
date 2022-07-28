// Core
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Mui
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Stack } from '@mui/material';
// Actions
import { authActions } from '../../../../../actions/authActions';
// Styles
import Styles from './styles.module.scss';
// Components
import DashboardHead from '../DashboardHead';

const StyledTableCell = styled(TableCell)(() => ({
    [ `&.${tableCellClasses.head}` ]: {
        backgroundColor: '#252F45',
        color:           '#AEC0CA',
        fontSize:        14,
        border:          'none',
    },
    [ `&.${tableCellClasses.body}` ]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#374259',
    },

    '&:nth-of-type(2n)': {
        backgroundColor: '#333E54',
    },

    th: {
        color: '#FFFFFF !important',
    },

    'td, th': {
        minWidth:   '100px',
        border:     'none',
        color:      '#AEC0CA',
        fontWeight: 700,
        lineHeight: '14px',
    },

    '& td:nth-of-type(1)': {
        maxWidth:     '400px',
        color:        '#FFFFFF !important',
        lineHeight:   '20px',
        fontWeight:   '400 !important',
        overflow:     'hidden',
        textOverflow: 'ellipsis',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const affiliateUsers = useSelector((state) => state.auth.affiliateUsers);
    const affiliateData = useSelector((state) => state.auth.affiliateData);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    useEffect(() => {
        if (affiliateData.ref) {
            const data = {
                ref:   affiliateData.ref,
                token: affiliateData.access,
            };
            dispatch(authActions.getAffiliateUsers(data));
        }
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onSetPage = (value) => {
        if (!affiliateData.ref) return null;

        if (!search) {
            const data = {
                page:  value,
                token: affiliateData.access,
            };
            dispatch(authActions.getPartAffiliateUsers(data));
        } else {
            const data = {
                page:  value,
                search,
                token: affiliateData.access,
            };
            dispatch(authActions.getSearchPartAffiliateUsers(data));
        }

        setPage(value);
    };

    const onSearch = () => {
        if (!search) return null;

        const data = {
            search,
            token: affiliateData.access,
        };
        dispatch(authActions.getSearchAffiliateUsers(data));
    };

    const onClearSearch = () => {
        if (!affiliateData.ref && !search) return null;

        const data = {
            ref:   affiliateData.ref,
            token: affiliateData.access,
        };
        dispatch(authActions.getAffiliateUsers(data));

        setSearch('');
        setPage(1);
    };

    const count = props.fullFuncional ? 25 : 10;

    return (
        <section className = { Styles.wrapper }>
            { !props.fullFuncional && <h4 className = { Styles.title }>Recent Signups</h4> }
            {
                props.fullFuncional
                && <div className = { Styles.search_wrapper }>
                    <input
                        type = { 'text' }
                        id = 'searchInput'
                        name = 'search'
                        value = { search }
                        onChange = { (event) => setSearch(event.target.value) }
                        placeholder = 'Search...'
                        className = { Styles.search_field } />
                    <button
                        onClick = { () => onSearch() }
                        className = { Styles.search_btn }>{ 'Search' }</button>
                    <button
                        onClick = { () => onClearSearch() }
                        className = { Styles.clear_search_btn } />
                </div>
            }
            <TableContainer component = { Paper } className = { Styles.table_wrapper }>
                <Table sx = { { minWidth: 800 } } aria-label = 'customized table'>
                    <DashboardHead
                        order = { order }
                        orderBy = { orderBy }
                        onRequestSort = { handleRequestSort }
                        rowCount = { 25 }
                        sorting = { props.fullFuncional } />
                    <TableBody>
                        {
                            affiliateUsers.results && affiliateUsers.results
                                .slice(0, count)
                                .map((row) => {
                                    return (
                                        <StyledTableRow key = { row.id }>
                                            <StyledTableCell
                                                component = 'th'
                                                scope = 'row'
                                                align = 'left'>
                                                { row.id }
                                            </StyledTableCell>
                                            <StyledTableCell align = 'left'>{ row.metamask }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ 'N/A' }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ 'N/A' }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ 'N/A' }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ 'N/A' }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ 'N/A' }</StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                props.fullFuncional
                && <Stack
                    mt = { 2 } justifyContent = 'center'
                    alignItems = 'center'>
                    <Pagination
                        className = { Styles.pagination }
                        count = { affiliateUsers.count ? Math.ceil(affiliateUsers.count / count) : 1 }
                        shape = 'rounded'
                        variant = 'outlined'
                        page = { page }
                        onChange = { (event, value) => onSetPage(value) } />
                </Stack>
            }
        </section>
    );
};

export default Dashboard;
