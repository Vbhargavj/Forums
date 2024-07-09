import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import AddUser from './AddUser';
import EditUser from './EditUser';
import mainUrl from '../../utils/constant';
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getAllUser()
  }, []);
  function getAllUser(){
    axios.get(`${mainUrl}/api/v1/user`)
    .then(response => {
      setUsers(response.data.data.doc);
    })
    .catch(error => {
      console.error('There was an error fetching the users!', error);
    });
  }
  const handleAddUser = (user) => {
    axios.post(`${mainUrl}/api/v1/user`, user)
      .then(() => {
        getAllUser()
      })
      .catch(error => {
        console.error('There was an error adding the user!', error);
      });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    
  };

  const handleUpdateUser = (updatedUser) => {
    axios.patch(`${mainUrl}/api/v1/user/${updatedUser._id}`, updatedUser)
      .then(response => {
        setEditingUser(null);
        getAllUser()
      })
      .catch(error => {
        console.error('There was an error updating the user!', error);
      });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`${mainUrl}/api/v1/user/${id}`)
      .then(() => {
        getAllUser()
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">User Management</h1>
      {editingUser ? (
        <EditUser user={editingUser} onUpdate={handleUpdateUser} />
      ) : (
        <AddUser onAdd={handleAddUser} />
      )}
      <UserList id users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
    </div>
  );
};

export default AdminPanel;
