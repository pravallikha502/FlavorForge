import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const cache = new Map();

const recipeService = {
  fetchWithCache: async (url) => {
    if (cache.has(url)) return cache.get(url);
    const response = await axios.get(url);
    cache.set(url, response.data);
    return response.data;
  },

  // Search recipes by name
  searchByName: async (name) => {
    try {
      const data = await recipeService.fetchWithCache(`${BASE_URL}/search.php?s=${name}`);
      return data.meals || [];
    } catch (error) {
      console.error('Error searching by name:', error);
      return [];
    }
  },

  // Get recipe by ID
  getById: async (id) => {
    try {
      const data = await recipeService.fetchWithCache(`${BASE_URL}/lookup.php?i=${id}`);
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error('Error getting by ID:', error);
      return null;
    }
  },

  // List all categories
  listCategories: async () => {
    try {
      const data = await recipeService.fetchWithCache(`${BASE_URL}/categories.php`);
      return data.categories || [];
    } catch (error) {
      console.error('Error listing categories:', error);
      return [];
    }
  },

  // Filter by category
  getByCategory: async (category) => {
    try {
      const data = await recipeService.fetchWithCache(`${BASE_URL}/filter.php?c=${category}`);
      return data.meals || [];
    } catch (error) {
      console.error('Error getting by category:', error);
      return [];
    }
  },

  // Filter by area (cuisine)
  getByArea: async (area) => {
    try {
      const data = await recipeService.fetchWithCache(`${BASE_URL}/filter.php?a=${area}`);
      return data.meals || [];
    } catch (error) {
      console.error('Error getting by area:', error);
      return [];
    }
  },

  // Get random recipe
  getRandom: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/random.php`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error getting random recipe:', error);
      return null;
    }
  },

  getTrending: async () => {
    try {
      // Single call to get a large list, then shuffle/limit
      const data = await recipeService.fetchWithCache(`${BASE_URL}/search.php?s=`);
      const meals = data.meals || [];
      return meals.sort(() => 0.5 - Math.random()).slice(0, 16);
    } catch (error) {
      console.error('Error getting trending:', error);
      return [];
    }
  }
};

export default recipeService;
