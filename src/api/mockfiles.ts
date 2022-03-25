import { v4 } from 'uuid';
import { Recipe } from '../types/recipesTypes';

export const mockRecipes:Recipe[] = [
  {
    id: 1,
    name: 'Apfelkuchen',
    showEditForm: false,
    image:1,
    ingredients: [
      {
        name: 'Zucker',
        amount: 100,
        unit: 'Gramm',
        id: v4(),
      },
      {
        name: 'Eier',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
      {
        name: 'Vanillinzucker',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
      {
        name: 'Äpfel',
        amount: 6,
        unit: 'Piece',
        id: v4(),
      },
      {
        name: 'Puddingpulver',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
    ],
  },
  {
    id: 2,
    name: 'Pudding',
    showEditForm: false,
    image:2,
    ingredients: [
      {
        name: 'Zucker',
        amount: 50,
        unit: 'Gramm',
        id: v4(),
      },
      {
        name: 'Sahne',
        amount: 0.2,
        unit: 'Liter',
        id: v4(),
      },
      {
        name: 'Vanilleschote',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
      {
        name: 'Eier',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
    ],
  },
  {
    id: 3,
    name: 'Spaghetti',
    showEditForm: false,
    image:3,
    ingredients: [
      {
        name: 'Zucker',
        amount: 100,
        unit: 'Gramm',
        id: v4(),
      },
      {
        name: 'Sahne',
        amount: 0.5,
        unit: 'Liter',
        id: v4(),
      },
      {
        name: 'Vanilleschote',
        amount: 1,
        unit: 'Piece',
        id: v4(),
      },
      {
        name: 'Eier',
        amount: 3,
        unit: 'Piece',
        id: v4(),
      },
    ],
  },
];
