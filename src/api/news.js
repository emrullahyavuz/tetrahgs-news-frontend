import api from './api';

// Get all news
export const getAllNews = async (params = {}) => {
  try {
    const response = await api.get('/news', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get news by ID
export const getNewsById = async (id) => {
  try {
    const response = await api.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get news by slug
export const getNewsBySlug = async (slug) => {
  try {
    const response = await api.get(`/news/slug/${slug}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Create news
export const createNews = async (newsData) => {
  try {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(newsData).forEach(key => {
      if (key !== 'featuredImage' && key !== 'tags') {
        formData.append(key, newsData[key]);
      }
    });
    
    // Append tags as array
    if (newsData.tags && newsData.tags.length > 0) {
      newsData.tags.forEach(tagId => {
        formData.append('tags', tagId);
      });
    }
    
    // Append image if exists
    if (newsData.featuredImage) {
      formData.append('featuredImage', newsData.featuredImage);
    }
    
    const response = await api.post('/news', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Update news
export const updateNews = async (id, newsData) => {
  try {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(newsData).forEach(key => {
      if (key !== 'featuredImage' && key !== 'tags') {
        formData.append(key, newsData[key]);
      }
    });
    
    // Append tags as array
    if (newsData.tags && newsData.tags.length > 0) {
      newsData.tags.forEach(tagId => {
        formData.append('tags', tagId);
      });
    }
    
    // Append image if exists
    if (newsData.featuredImage && typeof newsData.featuredImage !== 'string') {
      formData.append('featuredImage', newsData.featuredImage);
    }
    
    const response = await api.put(`/news/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Delete news
export const deleteNews = async (id) => {
  try {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get related news
export const getRelatedNews = async (id, limit = 5) => {
  try {
    const response = await api.get(`/news/${id}/related`, { params: { limit } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get popular news
export const getPopularNews = async (limit = 5) => {
  try {
    const response = await api.get('/news/popular', { params: { limit } });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};