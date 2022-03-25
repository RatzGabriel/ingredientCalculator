export type Unit="Gramm" |"Liter" |"Piece"

export type Ingredients={
  name:string,
  amount:number,
  unit:Unit,
  id:string
}