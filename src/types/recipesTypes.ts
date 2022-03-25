import {Ingredients} from "./ingredientTypes"

export interface Recipe {
  id:number,
  name:string,
  showEditForm:boolean,
  ingredients:Ingredients[],
  image:number
}
