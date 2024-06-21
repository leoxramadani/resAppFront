import * as React from 'react';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('1', 159, 6.0, 24, 4.0),
//   createData('2', 237, 9.0, 37, 4.3),
//   createData('3', 262, 16.0, 24, 6.0),
//   createData('4', 305, 3.7, 67, 4.3),
// ];

export default function TableColumnPinning({rows,open, setOpen,setRowType,setDisplayedRow}) {

   
function labelDisplayedRows({ from, to, count }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }
  
  const getLabelDisplayedRowsTo = (rows, page, rowsPerPage) => {
    if (rows && rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows && rows.length
      : Math.min(rows && rows.length, (page + 1) * rowsPerPage);
  };
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleChangePage = (newPage) => {
      setPage(newPage);
    };
  
    const displayedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);


    const rowClicked = (param) =>{
      setOpen(true)
      setRowType(param);
  }


  
  return (
    <Box sx={{ width: '100%' }}>
      <Sheet
        variant="outlined"
        sx={{
          width: '100%',
          '--TableCell-height': '40px',
          // the number is the amount of the header rows.
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '80px',
          '--Table-lastColumnWidth': '144px',
          // background needs to have transparency to show the scrolling shadows
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
        //   sx={{
        //     '& tr > *:last-child': {
        //       position: 'sticky',
        //       right: 0,
        //       bgcolor: 'var(--TableCell-headBackground)',
        //     },
        //   }}
        >
          <thead>
            <tr style={{textAlign:"center"}}>
              <th style={{ width: '25%',textAlign:"center" }}>Kategoria</th>
              <th style={{ width: '25%',textAlign:"center" }}>Produkti</th>
              <th style={{ width: '25%',textAlign:"center" }}>Cmimi</th>
              <th style={{ width: '25%',textAlign:"center"}}>Ndryshimet</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows && displayedRows.map((row) => (
              <tr key={row.id}>
                <td>{row.categoryName}</td>
                <td>{row.name}</td>
                <td>{row.price}</td>
                <td className='w-[200px]'>
                  <Box sx={{ display: 'flex', gap: 1 , justifyContent:"center",width:"200"}}>
                    <Button size="sm" variant="plain" color="neutral" onClick={()=>{rowClicked("Edit");setDisplayedRow(row)}}>
                      Ndrysho
                    </Button>
                    <Button size="sm" variant="soft" color="danger" >
                      Fshije
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
          <tr>
            <td colSpan={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'flex-end',
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: rows.length === -1 ? -1 : rows.length,
                  })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      rows.length !== -1
                        ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
        </Table>
      </Sheet>
    </Box>
  );
}
