// src/admin/UserManagement.jsx

import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../services/adminService';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Kullanıcıları yüklerken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        await deleteUser(userId);
        // Kullanıcı listesini güncelle
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        setError('Kullanıcı silinirken bir hata oluştu.');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-management">
      <h2>Kullanıcı Yönetimi</h2>
      
      <Link to="/admin/users/new" className="btn btn-primary">
        Yeni Kullanıcı Ekle
      </Link>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad Soyad</th>
            <th>Email</th>
            <th>Kullanıcı Tipi</th>
            <th>Durum</th>
            <th>Son Giriş</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>{user.status}</td>
              <td>{new Date(user.lastLogin).toLocaleString()}</td>
              <td>
                <Link to={`/admin/users/edit/${user.id}`} className="btn btn-sm btn-edit">
                  Düzenle
                </Link>
                <button 
                  onClick={() => handleDeleteUser(user.id)} 
                  className="btn btn-sm btn-delete"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;