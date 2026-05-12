import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const recipeService = {
  // Search recipes by name
  searchByName: async (name) => {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching by name:', error);
      return [];
    }
  },

  // Get recipe by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error('Error getting by ID:', error);
      return null;
    }
  },

  // List all categories
  listCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error('Error listing categories:', error);
      return [];
    }
  },

  // Filter by category
  getByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error getting by category:', error);
      return [];
    }
  },

  // Filter by area (cuisine)
  getByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
      return response.data.meals || [];
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

  // Get trending recipes (using random for now since TheMealDB doesn't have a trending endpoint)
  getTrending: async () => {
    try {
      // Fetch multiple random to simulate trending
      const promises = Array.from({ length: 8 }).map(() => axios.get(`${BASE_URL}/random.php`));
      const results = await Promise.all(promises);
      return results.map(res => res.data.meals[0]).filter(Boolean);
    } catch (error) {
      console.error('Error getting trending:', error);
      return [];
    }
  }
};

export default recipeService;
