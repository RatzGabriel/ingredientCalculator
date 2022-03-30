import * as React from 'react';
import * as actions from "api/store/recipes";
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { v4 } from "uuid"
import { Ingredients, Unit } from 'types/ingredientTypes';
import { Label, InputText } from "./FormInput.styles"

//MUI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function FormInput() {

  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>("Piece");
  const [recipeName, setRecipeName] = useState("");
  const [tempIngredients, setTempIngredients] = useState<Ingredients[]>([])
  const [rows, setRows]: any = React.useState([])
  const dispatch = useDispatch();



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(
    name: string,
    amount: number,
    unit: string,
  ) {
    return { name, amount, unit };
  }

  React.useEffect(() => {
    if (tempIngredients === rows) return
    let copy = []
    for (let i = 0; i < tempIngredients.length; i++) {
      let inc = createData(
        tempIngredients[i].name,
        tempIngredients[i].amount,
        tempIngredients[i].unit
      )
      copy.push(inc)
    }
    setRows(copy)
  }, [tempIngredients])




  function addIngredients() {
    let tempIngredientsCopy: Ingredients[] = [...tempIngredients];
    let copyIngredient = ingredient;
    let copyIngredientArray = copyIngredient.split('')
    copyIngredientArray[0] = copyIngredientArray[0].toUpperCase();
    for (let i = 1; i < copyIngredientArray.length; i++) {
      copyIngredientArray[i] = copyIngredientArray[i].toLowerCase()
    }
    tempIngredientsCopy.push({
      name: copyIngredientArray.join(""),
      amount: Number(amount),
      unit,
      id: v4()
    });
    setTempIngredients(tempIngredientsCopy)
  }

  function addRecipe() {
    dispatch(actions.createRecipe({ name: recipeName, ingredients: tempIngredients }))
    setRecipeName("")
    setAmount(0)
    setIngredient("")
    setUnit("Gramm")
    setTempIngredients([])
  }

  const handleChange = (event: SelectChangeEvent) => {
    let value: any = event.target.value
    setUnit(value)
  };

  return (
    <div style={{ border: "3px solid #1976d2", padding: "1rem 3em" }}>
      <p style={{ margin: "3rem 0", fontWeight: "bold", fontSize: "3rem" }}>CREATE RECIPE</p>
      <form>
        <Box sx={{ minWidth: 120 }}>
          <p style={{ width: "50%", padding: "1rem 0", margin: "1rem 0", fontWeight: "bold", borderBottom: "1px solid black", fontSize: "1.5rem" }}>STEP 1 - Add Ingredient</p>
          <FormControl fullWidth>

            <InputLabel id="unit">Unit</InputLabel>
            <Select
              sx={{ maxWidth: "150px" }}
              labelId="unit"
              id="unit"
              value={unit}
              label="unit"
              onChange={handleChange}
            >
              <MenuItem value={"Piece"}>PIECE</MenuItem>
              <MenuItem value={"GRAMMS"}>GRAMMS</MenuItem>
              <MenuItem value={"Liter"}>LITER</MenuItem>
            </Select>
            <Label htmlFor="ingredient">Ingredient Name:
              <br />
              <InputText

                onChange={(e) => setIngredient(e.target.value)}
                value={ingredient}
                type="text" />
            </Label>
            <Label htmlFor="amount">Amount:
              <br />
              <InputText onChange={(e: any) => {
                setAmount(e.target.value)
              }}
                value={amount} type="number" />
            </Label>
            <Button
              sx={{ maxWidth: "200px", }}
              variant="contained"
              type="button"
              onClick={addIngredients}>
              Add Ingredient
            </Button>
          </FormControl>
        </Box>
      </form>
      <p style={{ width: "50%", padding: "1rem 0", fontWeight: "bold", margin: "2rem 0", borderBottom: "1px solid black", fontSize: "1.5rem" }}>Step 2 - Check all ingredients</p>
      {
        <TableContainer key={v4()} component={Paper} sx={{ margin: "0rem 0rem 3rem 0rem", maxWidth: "800px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ingredient</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
                <StyledTableCell align="right">Unit</StyledTableCell>
                <StyledTableCell align="right">Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: any) => (
                <StyledTableRow key={v4()}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.unit}</StyledTableCell>
                  <StyledTableCell align="right">  <Button sx={{ color: "red" }} onClick={() => {
                    let newVal = [...tempIngredients];
                    let a = newVal.slice(0, index);
                    let b = newVal.slice(index + 1)
                    let newCopy = [...a, ...b]
                    setTempIngredients(newCopy)
                  }} type="button">X</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
      <Label htmlFor="recipe">

        <p style={{ width: "50%", padding: "1rem 0", fontWeight: "bold", borderBottom: "1px solid black", fontSize: "1.5rem" }}>Step 3 - Add Recipe name and create Recipe</p>
        <br />
        Name of Recipe
        <br />
        <InputText
          onChange={(e) => setRecipeName(e.target.value)}
          value={recipeName}
          type="text"
        />
      </Label>
      <br />
      <Button
        variant="contained"
        type="button"
        onClick={() => addRecipe()}>
        Add Recipe
      </Button>
    </div>
  )
}

export default FormInput


