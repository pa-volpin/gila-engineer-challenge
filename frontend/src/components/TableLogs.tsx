import { Box, Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, Typography } from '@mui/material'
import { Ref, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import EnhancedTableHead, { HeadRow } from './TableHead';
import TablePaginationActions from './TablePagination';
import { MessageRounded } from '@mui/icons-material';
import Details from './Details';
import { formatDate } from '../utils/formatDate';

interface Props {
}

export interface Log {
    _id: string;
    message: string;
    messageCategory: string;
    channel: string;
    createdAt: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      subscribed: string[];
      channels: string[];
    }
}

function TableLogs(props: Props, ref: Ref<{ fetchLogs: CallableFunction }>) {

  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(0);

  const [resetLoading, setResetLoading] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalLog, setModalLog] = useState<Log>();


  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getLogs = async () => {
    setLoading(true);

    fetch(`http://localhost:8080/notifications/logs?order=${order}&orderBy=${orderBy}&limit=${limit}&page=${page}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        setCount(data.count);
        setLogs(data.rows);
      })
      .catch(error => {
        console.log(`Error fetching logs: ${error}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const resetLogs = async () => {
    setResetLoading(true);

    const requestConfig = {
      method: 'DELETE',
    }

    fetch(`http://localhost:8080/notifications/logs`, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(data => {
        if (data.message === 'Success') {
          getLogs();
        }
      })
      .catch(error => {
        console.log(`Error deleting logs: ${error}`)
      })
      .finally(() => {
        setResetLoading(false)
      })
  }

  useImperativeHandle(ref, () => ({
    fetchLogs: () => {
      setPage(1);
      getLogs();
    }
  }));

  useEffect(() => {
    getLogs();
  }, [limit, order, orderBy, page])


  const headRows: HeadRow[] = [
    { id: "messageCategory", numeric: false, disablePadding: false, showSort: true, label: 'Category' },
    { id: "channel", numeric: false, disablePadding: false, showSort: true, label: 'Channel' },
    { id: "user", numeric: false, disablePadding: false, showSort: false, label: 'User' },
    { id: "createdAt", numeric: false, disablePadding: false, showSort: true, label: 'Date' },
    { id: "details", numeric: false, disablePadding: false, showSort: false, label: 'Details' },
  ];

  const handleChangePage = (page: number) => {
    setPage(page + 1);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
  };

  const handleRequestSort = (property: string) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ padding: 4, flexGrow: 1 }}>
      <Details
        isOpen={isOpenModal}
        setOpenModal={setIsOpenModal}
        log={modalLog}
      />
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant='h6' style={{ padding: '8px 0' }}>Logs</Typography>
        <Button
          variant="outlined"
          id="reset-button"
          onClick={() => resetLogs()}
          disabled={resetLoading}
        >
          {resetLoading ? <CircularProgress size={24} /> : 'Reset list'}
        </Button>
      </Box>
      <Table sx={styles.table}>
        <tbody>
          <tr>
            <td>
              {loading &&
                <Box sx={styles.spinner}>
                  <CircularProgress />
                </Box>}
              {logs.length === 0 &&
                <Box sx={styles.noResults}>
                  {!loading && <Typography sx={styles.spinner}>No results found</Typography>}
                </Box>}
            </td>
          </tr>
        </tbody>
        <EnhancedTableHead
          headRows={headRows}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody style={{ opacity: loading ? '0.3' : '1' }}>
          {logs.map((log: Log, index) => {
            return (
              <TableRow
                style={styles.tableRow}
                key={index}
                hover
              >
                <TableCell style={styles.cell}>
                  {log.messageCategory}
                </TableCell>
                <TableCell style={styles.cell}>
                  {log.channel}
                </TableCell>
                <TableCell style={styles.cell}>
                  {log.user.name}
                </TableCell>
                <TableCell style={styles.cell}>
                  {formatDate(log.createdAt)}
                </TableCell>
                <TableCell style={styles.cell}>
                  <IconButton onClick={() => { setModalLog(log); setIsOpenModal(true); }}>
                    <MessageRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter style={{ opacity: loading ? '0.3' : '1' }}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              count={count}
              rowsPerPage={limit}
              page={page - 1}
              onPageChange={(_, page) => handleChangePage(page)}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  )
}

export default forwardRef(TableLogs);


const styles = {
  container: {
    padding: 0
  },
  table: {
    position: 'relative',
    marginBottom: '4rem',
  },
  tableRow: {
    cursor: 'pointer'
  },
  spinner: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    top: '-5px',
    opacity: '1',
    zIndex: 2,
  },
  noResults: {
    height: '100px',
  },
  deleteTextConfirm: {
    marginLeft: '-30px',
    fontWeight: 'bold',
  },
  editWidth: {
    width: '90%'
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: '2.75rem',
    height: '2.75rem',
  },
  avatarSmallText: {
    fontSize: '0.775rem',
    width: '2.75rem',
    height: '2.75rem',
  },
  chip: {
    margin: 5,
  },
  thumbUp: {
    marginRight: 15,
    color: "#349c34"
  },
  thumbDown: {
    marginRight: 15,
    color: "#d04545"
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  cell: {
    fontSize: '0.775rem',
    padding: '0.25rem',
  },
  cellChip: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    marginLeft: '0.5rem'
  },
  buttonFilterIcon: {
    marginLeft: 5
  },
  buttonFilter: {
    zIndex: 200,
    backgroundColor: '#2554C7',
    height: '2.2rem',
    width: '6.5rem',
    padding: '1rem',
    color: '#fff',
  },
  clearFilter: {
    cursor: 'pointer',
    textDecoration: 'underline',
    zIndex: 200,
    padding: '0.75rem 0.5rem',
    color: '#000',
  },
  filterContainer: {
    position: 'relative',
    width: '100%',
  },
  filterChipContainer: {
    paddingLeft: 2.5,
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterChip: {
    cursor: 'pointer',
    margin: 5,
  },
  companyName: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkBoxWithoutTooltip: {
    paddingLeft: '11px',
  },
  checkBoxWithTooltip: {
    padding: 0
  },
}
