import api from './api';

// Get all tags
export const getAllTags = async () => {
  try {
    const response = await api.get('/tags');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get tag by ID
export const getTagById = async (id) => {
  try {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get tag by slug
export const getTagBySlug = async (slug) => {
  try {
    const response = await api.get(`/tags/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Create tag
export const createTag = async (tagData) => {
  try {
    const response = await api.post('/tags', tagData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Update tag
export const updateTag = async (id, tagData) => {
  try {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Delete tag
export const deleteTag = async (id) => {
  try {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get news by tag
export const getNewsByTag = async (slug, params = {}) => {
  try {
    const response = await api.get(`/tags/news/${slug}`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};