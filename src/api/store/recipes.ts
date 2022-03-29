import { createSelector, createSlice } from '@reduxjs/toolkit';
import { mockRecipes } from '../mockfiles';



let lastId = mockRecipes.length;

const slice = createSlice({
  name: 'recipes',
  initialState: mockRecipes,
  reducers: {
    createRecipe: (recipes, action) => {
      recipes.push({
        id: ++lastId,
        name: action.payload.name,
        showEditForm: false,
        ingredients: action.payload.ingredients,
        image:(Math.floor(Math.random()*(1-13)+13))
      });
    },
    deleteRecipe: (recipes, action) => {
    
      return recipes.filter((recipe) => recipe.id !== action.payload.id);
    },
    toggleEditable: (recipes, action) => {
      const index = recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index === -1) return;
      recipes[index].showEditForm = !recipes[index].showEditForm;
    },
    changeRecipe: (recipes, action) => {

      
      const index = recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (index === -1) return;
      recipes[index] = action.payload.updatedRecipe;
    },
    deleteIngredient: (recipes, action) => {
      
      const index = recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      let filtered = recipes[index].ingredients.filter(
        (ingredients) => ingredients.id !== action.payload.ingredientId
      );
      recipes[index].ingredients = filtered;
    },
  },
});

const {
  createRecipe,
  deleteRecipe,
  toggleEditable,
  changeRecipe,
  deleteIngredient,
} = slice.actions;
export {
  createRecipe,
  deleteRecipe,
  toggleEditable,
  changeRecipe,
  deleteIngredient,
};
export default slice.reducer;
