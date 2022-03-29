import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

import { RootState } from "api/store/configureStore";
import * as actions from "api/store/recipes"
import { Ingredients, Unit } from "types/ingredientTypes";
import { Recipe } from "types/recipesTypes";
import { IngredientForm } from "../index";

//MUI
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';


function RecipeList() {
  const dispatch = useDispatch();
  const recipesLoaded = useSelector((state: RootState) => state);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (recipesLoaded === recipes) return
    else setRecipes(recipesLoaded)

  }, [recipesLoaded])



  const changeRecipe = (name: string, amount: number, unit: Unit, id: number, ingredientId: string) => {
    let copyRecipes = [...recipes];
    let findRecipesIndex = recipes.findIndex(elem => elem.id === id);
    let findIngredientIndex = copyRecipes[findRecipesIndex].ingredients.findIndex(elem => elem.id === ingredientId);
    let copyRecipe: Recipe = { ...copyRecipes[findRecipesIndex] };
    let newIngredientObject: Ingredients = {
      name, unit, amount, id: ingredientId
    };
    copyRecipe.ingredients = [...copyRecipes[findRecipesIndex].ingredients];
    copyRecipe.ingredients[findIngredientIndex] = newIngredientObject;
    dispatch(actions.changeRecipe({ id, updatedRecipe: copyRecipe }))
  }

  const removeReceipe = (id: number) => {
    dispatch(actions.deleteRecipe({ id }))
  }

  const changeEditable = (id: Number) => {
    dispatch(actions.toggleEditable({ id }))
  }



  return (
    <>
      {recipes?.map(recipe => <Card key={v4()} sx={{ maxWidth: 345, width: "100%" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`/recipeImages/recipeimage${recipe.image}.jpg`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name}
          </Typography>
          <div>
            {recipe.ingredients.map((ingredient) => {
              if (!recipe.showEditForm) {
                return <ul key={v4()}>
                  <li style={{ fontWeight: "bold" }}>{ingredient.name}</li>
                  <li>{ingredient.unit}</li>
                  <li>{ingredient.amount}</li>
                  <br />
                </ul>;
              }
              else {
                return <ul key={v4()}>
                  <IngredientForm

                    changeRecipe={changeRecipe}
                    id={recipe.id}
                    ingredientId={ingredient.id}
                    nameInput={ingredient.name}
                    amountInput={ingredient.amount}
                    unitInput={ingredient.unit} />
                </ul>;
              }
            })}
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "space-around" }}>
          <Button variant="contained" onClick={() => changeEditable(recipe.id)}>{recipe.showEditForm ? "Back to normal Mode!" : "Edit Mode"}</Button>
          <Button variant="contained" onClick={() => removeReceipe(recipe.id)} style={{ backgroundColor: "red" }} size="small">Remove</Button>
        </CardActions>
      </Card>)}
    </>
  )
}

export default RecipeList


