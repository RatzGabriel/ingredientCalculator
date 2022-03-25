import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Recipe } from '../../types/recipesTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/configureStore';
import { AccumulateIngredients } from '../../utils/AccumulateIngredients';
import { v4 } from "uuid"
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



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows]: any = React.useState([])
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [ingredients, setIngredients] = React.useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  console.log('check if site is loaded');

  const recipesLoaded = useSelector((state: RootState) => state)



  React.useEffect(() => {

    if (recipesLoaded === recipes) return
    else {
      let copy = [...rows]
      let accumulatedIngredients = AccumulateIngredients(recipesLoaded);
      console.log(accumulatedIngredients.length, accumulatedIngredients);
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
                console.log(rows)
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


// import React, { useState, useEffect } from 'react'
// import { AccumulateIngredients } from '../../utils/AccumulateIngredients';
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { v4 } from "uuid"
// import { Recipe } from '../../types/recipesTypes';
// import { AppDispatch, RootState } from '../../store/configureStore';
// import { Ingredients } from "../../types/ingredientTypes"
// import styled from "styled-components"

// function IngredientList() {
//   const [recipes, setRecipes] = useState<Recipe[]>([])
//   const [ingredients, setIngredients] = useState<any>()
//   const dispatch = useDispatch<AppDispatch>();

//   const recipesLoaded = useSelector((state: RootState) => state)

//   useEffect(() => {
//     setRecipes(recipesLoaded)
//   }, [])

//   useEffect(() => {

//     if (recipesLoaded === recipes) return
//     else setIngredients(AccumulateIngredients(recipesLoaded))


//   }, [recipesLoaded])





//   return (
//     <OrderList>
//       <TitleH2>Ingredient List:</TitleH2>
//       {ingredients && ingredients.map((ingredient: Ingredients) =>
//         <SingleUl key={v4()}>
//           <SingleLI>{ingredient.name}</SingleLI>
//           <SingleLI>{ingredient.amount}</SingleLI>
//           <SingleLI>{ingredient.unit}</SingleLI>

//         </SingleUl>)}
//     </OrderList>
//   )
// }

// export default IngredientList

// const SingleLI = styled.li`
//   margin-right:1rem ;
// `

// const SingleUl = styled.ul`
// margin:1rem 0 ;
// display:flex ;
// justify-content:space-between ;
// `

// const OrderList = styled.ol`
// border:1px solid black ;
// `


// const TitleH2 = styled.h2`
// font-size:2rem ;
// font-weight:bold ;
// `