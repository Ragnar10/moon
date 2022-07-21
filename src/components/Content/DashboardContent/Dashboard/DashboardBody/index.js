// Core
import React, { useState } from "react";
//Styles
import Styles from "./styles.module.scss";
// Mui
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Stack } from "@mui/material";
import DashboardHead from "../DashboardHead";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#374259",
  },

  "&:nth-of-type(2n)": {
    backgroundColor: "#333E54",
  },

  th: {
    color: "#FFFFFF !important",
  },

  "td, th": {
    border: "none",
    color: "#AEC0CA",
    fontWeight: 700,
    lineHeight: "14px",
  },

  "& td:nth-of-type(1)": {
    color: "#FFFFFF !important",
    lineHeight: "20px",
    fontWeight: "400 !important",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(userId, address, farming, total, active, closed, earned) {
  return { userId, address, farming, total, active, closed, earned };
}

const rows = [
  createData(
    "#0000001",
    "0xb794f5ea0ba39494ce839613fffba74279579268",
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "N/A"
  ),
  createData(
    "#0000002",
    "0xb794f5ea0ba39494ce839613fffba74279579268",
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "N/A"
  ),
  createData(
    "#0000003",
    "0xb794f5ea0ba39494ce839613fffba74279579268",
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "N/A"
  ),
  createData(
    "#0000004",
    "0xb794f5ea0ba39494ce839613fffba74279579268",
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "N/A"
  ),
  createData(
    "#0000005",
    "0xb794f5ea0ba39494ce839613fffba74279579268",
    "N/A",
    "N/A",
    "N/A",
    "N/A",
    "N/A"
  ),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section>
      <h4 className={Styles.title}>Recent Signups</h4>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <DashboardHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.userId}>
                <StyledTableCell component="th" scope="row">
                  {row.userId}
                </StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right">{row.farming}</StyledTableCell>
                <StyledTableCell align="right">{row.total}</StyledTableCell>
                <StyledTableCell align="right">{row.active}</StyledTableCell>
                <StyledTableCell align="right">{row.closed}</StyledTableCell>
                <StyledTableCell align="right">{row.earned}</StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={7} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={2} justifyContent="center" alignItems="center">
        <Pagination
          className={Styles.pagination}
          count={+(rows.length / 2).toFixed()}
          shape="rounded"
          variant="outlined"
          page={page}
          defaultPage={0}
          onChange={handleChangePage}
        />
      </Stack>
    </section>
  );
};

export default Dashboard;
