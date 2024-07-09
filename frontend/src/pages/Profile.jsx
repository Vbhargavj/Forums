import React from 'react';
import { ProfileCard } from '../components/Profiles/ProfileCard';
import { Bar } from '../components/Bar';

const Profile = () => {
  return (
    <div>
      <Bar />
      <div className="font-sans relative flex justify-center items-center h-screen">
        <div className="absolute inset-0 bg-blue-500 h-1/2">
          <div className="ms-10 mt-10 font-bold text-white text-2xl">My Profile</div>
          <div className="ms-12">View Profile</div>
          <div className="absolute top-11 right-4 m-3">joined 2d ago</div>
        </div>
        <div className="bg-white shadow-md rounded-2xl absolute z-10 mt-20 w-4/6">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
