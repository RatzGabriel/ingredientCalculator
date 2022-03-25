


export const AccumulateIngredients= function(recipes:any){
let ingredientList:any={}
let ingredientArray:any=[]
recipes.map((singleRecipe:any):void=>{
let t=singleRecipe.ingredients;
for(let i=0;i<t.length;i++){
  if(ingredientList[t[i].name]===undefined){
    ingredientList[t[i].name]={
      amount:t[i].amount,
      unit:t[i].unit,
      name:t[i].name
    }
  }
  else{
    let copy={...ingredientList}
    copy[t[i].name].amount+=t[i].amount
    copy[t[i].name].name=t[i].name
    ingredientList={...copy}
  }
}
})

for(let j in ingredientList){
  ingredientArray.push(ingredientList[j])
}



return ingredientArray
}
