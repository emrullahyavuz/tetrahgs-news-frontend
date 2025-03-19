import api from './api'; 




// Kullanıcı Yönetimi
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Kullanıcıları getirme hatası:', error);
    throw error;
  }
};

// Create user
// export const createUser = async (userData) => {
//   try {
//     debugger;
//     const response = await axios.post(`/users`, userData)
    
//     return response.data
//   } catch (error) {
    
//     throw error.response?.data || { message: "Kullanıcı oluşturulurken bir hata oluştu." }
//   }
// }

// Create user
export const createUser = async (userData) => {
  try {
    debugger;
    
    const requestData = {
     
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      gender: userData.gender,
      userType: userData.userType,
      status: userData.status,
    }

    const response = await api.post(`/users`, requestData)
    return response.data
  } catch (error) {
    console.error("Hata Detayı:", error);
    if (error.response && error.response.data) {
      throw error.response.data
    }
    throw { message: "Kullanıcı oluşturulurken bir hata oluştu." }
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı detaylarını getirme hatası:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    debugger;
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı silme hatası:', error);
    throw error;
  }
};

// Haber Yönetimi
export const getNews = async () => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    console.error('Haberleri getirme hatası:', error);
    throw error;
  }
};

export const getNewsById = async (newsId) => {
  try {
    const response = await api.get(`/news/${newsId}`);
    return response.data;
  } catch (error) {
    console.error('Haber detaylarını getirme hatası:', error);
    throw error;
  }
};

export const createNews = async (newsData) => {
  try {
    const response = await api.post('/news', newsData);
    return response.data;
  } catch (error) {
    console.error('Haber oluşturma hatası:', error);
    throw error;
  }
};

export const updateNews = async (newsId, newsData) => {
  try {
    const response = await api.put(`/news/${newsId}`, newsData);
    return response.data;
  } catch (error) {
    console.error('Haber güncelleme hatası:', error);
    throw error;
  }
};

export const deleteNews = async (newsId) => {
  try {
    const response = await api.delete(`/news/${newsId}`);
    return response.data;
  } catch (error) {
    console.error('Haber silme hatası:', error);
    throw error;
  }
};

// Kategori Yönetimi
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Kategorileri getirme hatası:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Kategori oluşturma hatası:', error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
  
    const response = await api.put(`/categories/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Kategori güncelleme hatası:', error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Kategori silme hatası:', error);
    throw error;
  }
};

// Yorum Yönetimi
export const getComments = async () => {
  try {
    const response = await api.get('/comments');
    return response.data;
  } catch (error) {
    console.error('Yorumları getirme hatası:', error);
    throw error;
  }
};

export const approveComment = async (commentId) => {
  try {
    const response = await api.put(`/comments/${commentId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Yorum onaylama hatası:', error);
    throw error;
  }
};

export const rejectComment = async (commentId) => {
  try {
    const response = await api.put(`/comments/${commentId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Yorum reddetme hatası:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Yorum silme hatası:', error);
    throw error;
  }
};

// Site Ayarları
export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Ayarları getirme hatası:', error);
    throw error;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const response = await api.put('/settings', settingsData);
    return response.data;
  } catch (error) {
    console.error('Ayarları güncelleme hatası:', error);
    throw error;
  }
};