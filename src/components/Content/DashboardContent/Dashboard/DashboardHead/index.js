import React from 'react';

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import PropTypes from 'prop-types';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Box, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#252F45",
      color: "#AEC0CA",
      fontSize: 14,
      border: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


const headCells = [
    {
      id: 'User',
      numeric: false,
      disablePadding: true,
      label: 'User ID',
    },
    {
      id: 'Address',
      numeric: false,
      disablePadding: true,
      label: 'Address',
    },
    {
      id: 'Farming',
      numeric: true,
      disablePadding: false,
      label: 'Farming Pos.', 
    },
    {
      id: 'Total',
      numeric: true,
      disablePadding: false,
      label: 'Total Pos.',
    },
    {
      id: 'Active',
      numeric: true,
      disablePadding: false,
      label: 'Active Pos.',
    },
    {
      id: 'Closed',
      numeric: true,
      disablePadding: false,
      label: 'Closed Pos.',
    },
    {
      id: 'Earned',
      numeric: true,
      disablePadding: false,
      label: 'Earned Com.',
    },
  ];

const DashboardHead = (props) => {
    const {  order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
        <TableRow>
        {headCells.map((headCell) => (
            <StyledTableCell
                key={headCell.id}
                align={headCell.id === 'User' ? 'center' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                {headCell.label}

                {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel> */}
            </StyledTableCell>
        ))}
        </TableRow>
    </TableHead>
  )
}
export default DashboardHead;

DashboardHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

