import * as actions from "api/store/recipes"
import * as React from "react"
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Unit } from 'types/ingredientTypes';

//MUI
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';




type IngredientInput = {
  nameInput: string,
  amountInput: number,
  unitInput: Unit,
  changeRecipe: (name: string, amount: number, unit: Unit, id: number, ingredientId: string) => void,
  id: number,
  ingredientId: string,
  ingredientPosition: boolean
}


function IngredientForm({ nameInput, amountInput, unitInput, changeRecipe, id, ingredientId, ingredientPosition }: IngredientInput) {

  const dispatch = useDispatch();

  const [name, setName] = useState(nameInput);
  const [amount, setAmount] = useState(amountInput);
  const [unit, setUnit] = useState(unitInput);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const idPopUp = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      changeRecipe(name, amount, unit, id, ingredientId)
    }, 1000)

  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  function inputHandler(event: any, type: string) {
    let value = event.target.value
    if (type === "amount") return setAmount(value)
    if (type === "unit") return setUnit(value)
    if (type === "name") return setName(value)
  }



  return (
    <div>
      EDIT Ingredients!
      <div style={{ display: "flex" }}>
        <Input onChange={(e) => {
          inputHandler(e, 'name')
        }}
          value={name} type="text"></Input>
        <Button
          style={{ backgroundColor: "darkRed" }}
          variant="contained" type="button"
          onClick={() => dispatch(actions.deleteIngredient({ ingredientId, id }))}>
          X
        </Button>
      </div>
      <Input onChange={(e) => {
        inputHandler(e, 'amount')
      }}
        value={amount} type="text"></Input>
      <InputLabel htmlFor="unit"></InputLabel>
      <Select
        value={unit}
        onChange={(e) => inputHandler(e, "unit")}
        name="Unit"
        id="unit">
        <MenuItem value="Piece">PIECE</MenuItem>
        <MenuItem value="Gramm">GRAMMS</MenuItem>
        <MenuItem value="Liter">Liter</MenuItem>
      </Select>
      <br />
      {ingredientPosition && <Button aria-describedby={idPopUp} variant="contained" onClick={handleClick}>
        update and save changes
      </Button>}
      <Popover
        id={idPopUp}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Changes Saved</Typography>
      </Popover>
    </div>
  )
}

export default IngredientForm

