import * as React from 'react';
import { Recipe } from 'types/recipesTypes';
import { useSelector } from 'react-redux';
import { RootState } from 'api/store/configureStore';
import { AccumulateIngredients } from 'utils/AccumulateIngredients';
import { v4 } from "uuid"

//MUI
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
interface Column {
  id: 'ingredient' | 'amount' | 'Unit';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'ingredient', label: 'Ingredient', minWidth: 17 },
  { id: 'amount', label: 'Amount', minWidth: 17 },
  {
    id: 'Unit',
    label: 'Unit',
    minWidth: 17,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

];

interface Data {
  ingredient: string;
  amount: number;
  Unit: string;
}

function createData(
  ingredient: string,
  amount: number,
  Unit: string,
): Data {
  return { ingredient, amount, Unit };
}



export default function IngredientList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows]: any = React.useState([])
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const recipesLoaded = useSelector((state: RootState) => state);

  React.useEffect(() => {
    setRecipes(recipesLoaded)
  }, [])



  React.useEffect(() => {

    if (recipesLoaded === recipes) return
    else {
      let copy = [...rows]
      let accumulatedIngredients = AccumulateIngredients(recipesLoaded);
      for (let i = 0; i < accumulatedIngredients.length; i++) {
        let inc = createData(
          accumulatedIngredients[i].name,
          accumulatedIngredients[i].amount,
          accumulatedIngredients[i].unit
        )
        copy.push(inc)
      }
      setRows(copy)
    }

  }, [recipesLoaded])



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={v4()}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={v4()}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={v4()} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

