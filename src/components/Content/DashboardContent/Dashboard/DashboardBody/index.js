// Core
import { useState, useEffect } from 'react';
// Mui
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Stack } from '@mui/material';
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

const createData = (userId, address, farming, total, active, closed, earned) => {
    return {
        userId, address, farming, total, active, closed, earned,
    };
};

const rows = [
    createData(
        '#0000001',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000002',
        '0xy794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000003',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000004',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000005',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000006',
        '0xd794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000007',
        '0xd794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000008',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000009',
        '0xj794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000010',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000011',
        '0xc794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000012',
        '0xr794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000013',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000014',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000015',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000016',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000017',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000018',
        '0xc794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000019',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000020',
        '0xa794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000021',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000022',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000023',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000024',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
    createData(
        '#0000025',
        '0xb794f5ea0ba39494ce839613fffba74279579268',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
        'N/A',
    ),
];

const Dashboard = (props) => {
    const [page, setPage] = useState(1);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [list, setList] = useState(rows);

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_BACK_PATH}/v1/users/?referral__ref=ref-test`, {
    //         method:  'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onSearch = (event) => {
        let filteredList = [];

        const text = event.target.value;

        if (text.length > 0) {
            filteredList = rows.filter((item) => {
                const regex = new RegExp(`${text}`, 'gi');

                return item.address.match(regex);
            });
        }

        if (text.length === 0) {
            setList(rows);
        } else {
            setList(filteredList);
        }
    };

    const count = props.fullFuncional ? 10 : 7;
    const paginationData = page === 1 ? list.slice(0, page * count) : list.slice(page * count - count, page * count);


    return (
        <section className = { Styles.wrapper }>
            { !props.fullFuncional && <h4 className = { Styles.title }>Recent Signups</h4> }
            {
                props.fullFuncional
                && <input
                    type = { 'text' }
                    id = 'searchInput'
                    name = 'search'
                    onChange = { (event) => onSearch(event) }
                    placeholder = 'Search...'
                    className = { Styles.search } />
            }
            <TableContainer component = { Paper } className = { Styles.table_wrapper }>
                <Table sx = { { minWidth: 800 } } aria-label = 'customized table'>
                    <DashboardHead
                        order = { order }
                        orderBy = { orderBy }
                        onRequestSort = { handleRequestSort }
                        rowCount = { rows.length }
                        sorting = { props.fullFuncional } />
                    <TableBody>
                        {
                            paginationData
                                .slice(0, page * count)
                                .map((row) => {
                                    return (
                                        <StyledTableRow key = { row.userId }>
                                            <StyledTableCell component = 'th' scope = 'row'>
                                                { row.userId }
                                            </StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.address }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.farming }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.total }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.active }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.closed }</StyledTableCell>
                                            <StyledTableCell align = 'right'>{ row.earned }</StyledTableCell>
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
                        count = { list.length ? Math.ceil(list.length / count) : 1 }
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
