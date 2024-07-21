import { Box } from '@mui/material'
import Form from './components/Form'
import { useCallback, useRef } from 'react';
import TableLogs from './components/TableLogs';

function App() {
  const ref = useRef<{ fetchLogs: CallableFunction }>(null)

  const fetchDataOnSuccess = useCallback(() => ref.current?.fetchLogs(), [ref.current]);

  return (
    <Box sx={{
        display: 'flex',
        alignItems: 'stretch',
        width: '100vw%',
        padding: 20,
        gap: 10,
        justifyContent: 'flex-start',
        background: '#eee'
      }}
    >
      <Form fetchDataOnSuccess={fetchDataOnSuccess} />
      <TableLogs ref={ref} />
    </Box>
  )
}

export default App