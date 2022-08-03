require('dotenv').config();
const axios = require('axios');
const { Diet } = require('../db.js');
const { API_KEY } = process.env;

const getAllDiets = async (req, res, next) => {
  try {
    // Recipes contain diet types
    const recipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=50`
    );

    // Parsing the diet types into an iterable
    const dietsFromRecipes = new Set(
      recipes.data.results.map(recipe => recipe.diets).flat(1)
    );
    const dietTypes = [...dietsFromRecipes];
    
    // Finding or creating each diet type
    const diets = dietTypes.map(dietType => {
      return new Promise(async (resolve, reject) => {
        const dietsCreation = await Diet.findOrCreate({
          where: { name: dietType },
        });
        resolve(dietsCreation);
        reject(error => next(error));
      });
    });
    await Promise.all(diets);

    // Sending back all the diet types
    const dbDiets = await Diet.findAll();
    res.status(201).json(dbDiets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDiets,
};
