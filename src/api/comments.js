import api from './api';

// Get all comments
export const getAllComments = async () => {
  try {
    const response = await api.get('/comments');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get comments by news ID
export const getCommentsByNewsId = async (newsId) => {
  try {
    const response = await api.get(`/comments/news/${newsId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get pending comments
export const getPendingComments = async () => {
  try {
    const response = await api.get('/comments/pending');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get user comments
export const getUserComments = async () => {
  try {
    const response = await api.get('/comments/user');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Create comment
export const createComment = async (commentData) => {
  try {
    const response = await api.post('/comments', commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Update comment
export const updateComment = async (id, commentData) => {
  try {
    const response = await api.put(`/comments/${id}`, commentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Approve comment
export const approveComment = async (id) => {
  try {
    const response = await api.put(`/comments/${id}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Reject comment
export const rejectComment = async (id) => {
  try {
    const response = await api.put(`/comments/${id}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Delete comment
export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get comment count by news ID
export const getCommentCountByNewsId = async (newsId) => {
  try {
    const response = await api.get(`/comments/count/news/${newsId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};