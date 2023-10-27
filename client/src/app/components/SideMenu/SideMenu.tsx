'use client'

import React, { useState } from 'react';
import { BarChart, Settings, AccountBox } from '@mui/icons-material';
import Image from 'next/image';

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-white flex flex-col ${isCollapsed ? 'w-16' : 'w-64'} h-screen`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          {!isCollapsed && (
            <div className="mr-2">
              <Image src="/assets/Visualize-logos_transparent.png" alt="Visualize logo" width={160} height={40} layout="responsive" className="text-xl font-bold text-gray-800" />
            </div>
          )}
          <button className="p-1 focus:outline-none text-gray-400 hover:bg-gray-200 rounded-md" onClick={handleToggle}>
            {isCollapsed ? '>>' : '<<'}
          </button>
        </div>
      </div>
      <ul className="flex-grow flex flex-col p-4">
        <li className={`p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md ${isCollapsed ? 'hidden' : 'block'}`} onClick={() => console.log('Analytics clicked')}>
          <BarChart className="text-gray-400 mr-2" />
          <span className="text-gray-800">Analytics</span>
        </li>
        <li className={`p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md ${isCollapsed ? 'hidden' : 'block'}`} onClick={() => console.log('Profile clicked')}>
          <AccountBox className="text-gray-400 mr-2" />
          <span className="text-gray-800">Profile</span>
        </li>
        <li className={`p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md ${isCollapsed ? 'hidden' : 'block'}`} onClick={() => console.log('Settings clicked')}>
          <Settings className="text-gray-400 mr-2" />
          <span className="text-gray-800">Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
