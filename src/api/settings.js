import api from './api';

// Get all settings
export const getAllSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Get setting by key
export const getSettingByKey = async (key) => {
  try {
    const response = await api.get(`/settings/${key}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Update settings
export const updateSettings = async (settingsData) => {
  try {
    const response = await api.put('/settings', { settings: settingsData });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Upload site logo
export const uploadSiteLogo = async (logoFile) => {
  try {
    const formData = new FormData();
    formData.append('logo', logoFile);
    
    const response = await api.post('/settings/logo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};

// Delete setting
export const deleteSetting = async (key) => {
  try {
    const response = await api.delete(`/settings/${key}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Bir hata oluştu' };
  }
};