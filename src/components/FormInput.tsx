import { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as actions from "../store/recipes";
import * as React from 'react';
import { v4 } from "uuid"
import { Ingredients, Unit } from '../types/ingredientTypes';
import styled from "styled-components";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';


function FormInput() {
  const [age, setAge] = React.useState('');
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState<number>();
  const [unit, setUnit] = useState<Unit>("Piece");
  const [recipeName, setRecipeName] = useState("");
  const [tempIngredients, setTempIngredients] = useState<Ingredients[]>([])

  const dispatch = useDispatch();

  function inputHandler(event: any) {
    let value = event.target.value
    setUnit(value)
  }

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
      //check: do i need to parseint amount?
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
    <>
      <form>
        <Box sx={{ minWidth: 120, marginTop: "3rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"PIECE"}>PIECE</MenuItem>
              <MenuItem value={"GRAMMS"}>GRAMMS</MenuItem>
              <MenuItem value={"Liter"}>LITER</MenuItem>
            </Select>
            <Label htmlFor="ingredient">
              <br />
              <InputText placeholder='Ingredient Name' onChange={(e) => setIngredient(e.target.value)} value={ingredient} type="text" />
            </Label>
            <Label htmlFor="amount">
              <InputText onChange={(e: any) => {
                setAmount(e.target.value)
              }}
                value={amount} type="number" placeholder='Amount' />
            </Label>
            <Button variant="contained" type="button" onClick={addIngredients}>Add Ingredient to Recipe</Button>
            <Label htmlFor="recipe">
              <InputText onChange={(e) => setRecipeName(e.target.value)} value={recipeName} type="text" placeholder='Name of Recipe' />
            </Label>
          </FormControl>

          {/* <label htmlFor="unit"><H2Title>Add Ingredient:</H2Title>
          <select value={unit} onChange={(e) => inputHandler(e)} name="Unit" id="unit">
            <option value="PIECE">PIECE</option>
            <option value="GRAMS">GRAMS</option>
            <option value="Liter">Liter</option>
          </select>
        </label> */}

        </Box>
      </form>
      <p>Ingredientlist for Recipe:</p>
      {
        tempIngredients.map((ingredient, index) =>
          <div key={v4()}>
            {ingredient.name}
            {ingredient.amount}
            {ingredient.unit}
            <button onClick={() => {
              let newVal = [...tempIngredients];
              let a = newVal.slice(0, index);
              let b = newVal.slice(index + 1)
              let newCopy = [...a, ...b]
              setTempIngredients(newCopy)
            }} type="button">Remove</button>

          </div>
        )}
      <Button variant="contained" type="button" onClick={() => addRecipe()}>Add Recipe</Button>
    </>
  )
}

export default FormInput

const Label = styled.label`
margin-top:1rem ;
`

const InputText = styled.input`
border:none ;
border-bottom: 1px solid black;
margin:1rem 0rem ;
padding:.5rem 0 ;

`

const H2Title = styled.h2`
font-weight:bold ;
font-size:2rem ;
margin-bottom:2rem ;
`