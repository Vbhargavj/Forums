import React, { useState } from 'react';
import { EditProfile } from "./EditProfile";
import { Pro } from "./Pro";
import { EdiPass } from './EdiPass';

export function ProfileCard() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="mx-5 flex flex-col space-y-4">
      <div className="flex justify-between space-x-4 border-b-2 pb-2">
        <span className={`cursor-pointer ${activeTab === 'Profile' ? 'font-bold' : ''}`} onClick={() => setActiveTab('Profile')}>Profile</span>
        <span className={`cursor-pointer ${activeTab === 'Edit Profile' ? 'font-bold' : ''}`} onClick={() => setActiveTab('Edit Profile')}>Edit Profile</span>
        <span className={`cursor-pointer ${activeTab === 'Settings' ? 'font-bold' : ''}`} onClick={() => setActiveTab('Settings')}>Settings</span>
        <span className={`cursor-pointer ${activeTab === 'Activity Log' ? 'font-bold' : ''}`} onClick={() => setActiveTab('Activity Log')}>Activity Log</span>
      </div>

      <div className="flex-grow">
        {activeTab === 'Profile' && <Pro />}
        {activeTab === 'Edit Profile' && <EditProfile />}
        {activeTab === 'Settings' && <EdiPass/>}
        {activeTab === 'Activity Log' && <div>Activity Log Content</div>}
      </div>
    </div>
  );
}
