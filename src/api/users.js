// import api from './api';

// // Get all users
// export const getAllUsers = async () => {
//   try {
//     const response = await api.get('/users');
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };

// // Get user by ID
// export const getUserById = async (id) => {
//   try {
//     const response = await api.get(`/users/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };

// // Update user
// export const updateUser = async (id, userData) => {
//   try {
//     const response = await api.put(`/users/${id}`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };

// // Update password
// export const updatePassword = async (id, passwordData) => {
//   try {
//     const response = await api.put(`/users/${id}/password`, passwordData);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };

// // Upload profile image
// export const uploadProfileImage = async (id, imageFile) => {
//   try {
//     const formData = new FormData();
//     formData.append('profileImage', imageFile);
    
//     const response = await api.post(`/users/${id}/profile-image`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
    
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };

// // Delete user
// export const deleteUser = async (id) => {
//   try {
//     const response = await api.delete(`/users/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: 'Bir hata oluştu' };
//   }
// };