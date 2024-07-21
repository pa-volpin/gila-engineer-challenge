import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

export interface HeadRow {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  showSort: boolean;
  label: string;
}

interface Props {
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort: (property: string) => void;
  headRows: HeadRow[];
}


function EnhancedTableHead(props: Props) {
  const { order, orderBy, onRequestSort, headRows } = props;


  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === row.id ? order : false}
            style={{ flex: 1 }}
          >
            {row.showSort === false ?
              row.label
              :
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={() => onRequestSort(row.id)}
              >
                {row.label}
                {orderBy === row.id ? (
                  <span style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 20,
                    width: 1,
                  }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;