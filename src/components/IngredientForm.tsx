import { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as actions from "../store/recipes"
import { Unit } from '../types/ingredientTypes';

type IngredientInput = {
  nameInput: string,
  amountInput: number,
  unitInput: Unit,
  checkChanges: (name: string, amount: number, unit: Unit, id: number, ingredientId: string) => void,
  id: number,
  ingredientId: string,

}


function IngredientForm({ nameInput, amountInput, unitInput, checkChanges, id, ingredientId }: IngredientInput) {

  const dispatch = useDispatch();
  const [name, setName] = useState(nameInput);
  const [amount, setAmount] = useState(amountInput);
  const [unit, setUnit] = useState(unitInput);

  function inputHandler(event: any) {
    let value = event.target.value
    setUnit(value)
  }

  return (
    <div>
      <button type="button" onClick={() => dispatch(actions.deleteIngredient({ ingredientId, id }))}>Delete</button>
      <input onChange={(e) => {
        setName(e.target.value)
      }}
        value={name} type="text"></input>
      <input onChange={(e) => { setAmount(+e.target.value) }}
        value={amount} type="text"></input>
      <label htmlFor="unit">
        <select value={unit} onChange={(e) => inputHandler(e)} name="Unit" id="unit">
          <option value="PIECE">PIECE</option>
          <option value="GRAMMS">GRAMMS</option>
          <option value="Liter">Liter</option>
        </select>
      </label>
      <button onClick={() => checkChanges(name, amount, unit, id, ingredientId)}>Save changes</button>
    </div>
  )
}

export default IngredientForm