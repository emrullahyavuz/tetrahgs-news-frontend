import api from './api';

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get category by slug
export const getCategoryBySlug = async (slug) => {
  try {
    const response = await api.get(`/categories/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Create category
export const createCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Update category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};