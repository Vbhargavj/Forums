import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.reduce((initials, name) => initials + name.charAt(0), '');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Photo</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                {user.photo ? (
                  <img src={user.photo} alt="User" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="rounded-full h-12 w-12 bg-gray-400 flex items-center justify-center text-white text-xl">
                    {getInitials(user.name)}
                  </div>
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2">
                  Edit
                </button>
                <button onClick={() => onDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
