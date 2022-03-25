import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid"
import { RootState } from "../store/configureStore";
import * as actions from "../store/recipes"
import { Ingredients, Unit } from "../types/ingredientTypes";
import { Recipe } from "../types/recipesTypes";
import IngredientForm from "./IngredientForm";
import styled from "styled-components";

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const dispatch = useDispatch();
  const recipesLoaded = useSelector((state: RootState) => state)

  useEffect(() => {
    if (recipesLoaded === recipes) return
    else setRecipes(recipesLoaded)

  }, [recipesLoaded])



  const checkChanges = (name: string, amount: number, unit: Unit, id: number, ingredientId: string) => {

    let copyRecipes = [...recipes];
    let findRecipesIndex = recipes.findIndex(elem => elem.id === id);
    let findIngredientIndex = copyRecipes[findRecipesIndex].ingredients.findIndex(elem => elem.id === ingredientId);
    let copyRecipe: Recipe = { ...copyRecipes[findRecipesIndex] };
    let newIng: Ingredients = {
      name, unit, amount, id: ingredientId
    };
    copyRecipe.ingredients = [...copyRecipes[findRecipesIndex].ingredients];
    copyRecipe.ingredients[findIngredientIndex] = newIng;
    console.log('sdd', copyRecipe.ingredients[findIngredientIndex]);

    dispatch(actions.changeRecipe({ id, updatedRecipe: copyRecipe }))
  }

  const removeReceipe = (id: number) => {
    console.log(id);

    dispatch(actions.deleteRecipe({ id }))
  }


  const changeEditable = (id: Number) => {
    dispatch(actions.toggleEditable({ id }))
  }

  console.log(recipes);

  return (
    <RecipeMainDiv>

      {recipes && recipes.map(recipe =>
        <div key={v4()} >
          {<h2 style={{ fontWeight: "bold" }}>{recipe.name}</h2>}
          <RecipeImage src={`/recipeImages/recipeimage${recipe.image}.jpg`} alt="recipe image" />
          <button onClick={() => removeReceipe(recipe.id)} >Remove Receipt: {recipe.name}</button>
          <button type="button" onClick={() => changeEditable(recipe.id)}>{recipe.showEditForm ? "Save!" : "Edit"}</button>
          {
            recipe.ingredients.map((ingredient) => {
              if (!recipe.showEditForm) {
                return <ul key={v4()}>
                  <li>{ingredient.name}</li>
                  <li>{ingredient.unit}</li>
                  <li>{ingredient.amount}</li>
                  <br />
                </ul>
              }
              else {
                return <ul key={v4()}>
                  <IngredientForm checkChanges={checkChanges} id={recipe.id} ingredientId={ingredient.id} nameInput={ingredient.name} amountInput={ingredient.amount} unitInput={ingredient.unit} />
                </ul>
              }
            }
            )
          }
        </div>)}
    </RecipeMainDiv >
  )
}

export default RecipeList

const RecipeImage = styled.img`
height:130px ;
`

const RecipeMainDiv = styled.div`
display: flex;
justify-content:space-between ;
flex-wrap:wrap ;
border:1px solid black ;
`
