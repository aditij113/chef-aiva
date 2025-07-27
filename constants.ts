import type { Category } from './types';

export const INGREDIENT_CATEGORIES: Category[] = [
  {
    name: 'Protein',
    ingredients: [
      { id: 'protein-beans', name: 'Black Beans' },
      { id: 'protein-tofu', name: 'Tofu' },
      { id: 'protein-lentils', name: 'Lentils' },
      { id: 'protein-chickpeas', name: 'Chickpeas' },
      { id: 'protein-edamame', name: 'Edamame' },
      { id: 'protein-tempeh', name: 'Tempeh' },
    ],
  },
  {
    name: 'Cruciferous Greens',
    ingredients: [
      { id: 'cruc-broccoli', name: 'Broccoli' },
      { id: 'cruc-cauliflower', name: 'Cauliflower' },
      { id: 'cruc-brussels', name: 'Brussels Sprouts' },
      { id: 'cruc-cabbage', name: 'Cabbage' },
      { id: 'leafy-kale', name: 'Kale' },
    ]
  },
  {
    name: 'Leafy Greens',
    ingredients: [
      { id: 'leafy-spinach', name: 'Spinach' },
      { id: 'leafy-arugula', name: 'Arugula' },
      { id: 'leafy-romaine', name: 'Romaine' },
    ]
  },
  {
    name: 'Vegetables',
    ingredients: [
      { id: 'veg-carrot', name: 'Carrot' },
      { id: 'veg-bell-pepper', name: 'Bell Pepper' },
      { id: 'veg-onion', name: 'Onion' },
      { id: 'veg-garlic', name: 'Garlic' },
      { id: 'veg-tomato', name: 'Tomato' },
      { id: 'veg-potato', name: 'Potato' },
      { id: 'veg-zucchini', name: 'Zucchini' },
      { id: 'veg-mushroom', name: 'Mushroom' },
    ],
  },
  {
    name: 'Fruits',
    ingredients: [
      { id: 'berry-strawberry', name: 'Strawberry' },
      { id: 'berry-blueberry', name: 'Blueberries' },
      { id: 'berry-raspberry', name: 'Raspberries' },
      { id: 'fruit-apple', name: 'Apple' },
      { id: 'fruit-banana', name: 'Banana' },
      { id: 'fruit-orange', name: 'Orange' },
      { id: 'fruit-avocado', name: 'Avocado' },
      { id: 'fruit-lemon', name: 'Lemon' },
      { id: 'fruit-mango', name: 'Mango' },
    ],
  },
  {
    name: 'Grains',
    ingredients: [
      { id: 'grain-brown-rice', name: 'Brown Rice' },
      { id: 'grain-quinoa', name: 'Quinoa' },
      { id: 'grain-pasta', name: 'Pasta' },
      { id: 'grain-bread', name: 'Whole Wheat Bread' },
      { id: 'grain-oats', name: 'Oats' },
    ],
  },
  {
    name: 'Herbs',
    ingredients: [
        { id: 'herb-oregano', name: 'Oregano' },
        { id: 'herb-parsley', name: 'Parsley' },
        { id: 'herb-basil', name: 'Basil' },
    ]
  },
  {
    name: 'Spices',
    ingredients: [
      { id: 'spice-olive-oil', name: 'Olive Oil' },
      { id: 'spice-salt', name: 'Salt' },
      { id: 'spice-black-pepper', name: 'Black Pepper' },
      { id: 'spice-paprika', name: 'Paprika' },
    ],
  },
  {
    name: 'Nuts & Seeds',
    ingredients: [
      { id: 'seed-flax', name: 'Flax Seeds' },
      { id: 'seed-chia', name: 'Chia Seeds' },
      { id: 'nut-almonds', name: 'Almonds' },
      { id: 'nut-walnuts', name: 'Walnuts' },
    ],
  },
];