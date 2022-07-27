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
        border:     'none',
        color:      '#AEC0CA',
        fontWeight: 700,
        lineHeight: '14px',
    },

    '& td:nth-of-type(1)': {
        color:      '#FFFFFF !important',
        lineHeight: '20px',
        fontWeight: '400 !important',
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

    useEffect(() => {
        if (affiliateData.ref) {
            const data = {
                page,
                token: affiliateData.access,
            };
            dispatch(authActions.getPartAffiliateUsers(data));
        }
    }, [page]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const count = props.fullFuncional ? 25 : 10;

    return (
        <section className = { Styles.wrapper }>
            { !props.fullFuncional && <h4 className = { Styles.title }>Recent Signups</h4> }
            {
                props.fullFuncional
                && <input
                    type = { 'text' }
                    id = 'searchInput'
                    name = 'search'
                    placeholder = 'Search...'
                    className = { Styles.search } />
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
                        onChange = { (event, value) => setPage(value) } />
                </Stack>
            }
        </section>
    );
};

export default Dashboard;
