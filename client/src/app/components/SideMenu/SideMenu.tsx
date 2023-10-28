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
        <div className={`bg-white flex flex-col ${isCollapsed ? 'w-16' : 'w-40 md:w-64'} h-screen`}>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                    {!isCollapsed && (
                        <a href="/">
                            <div className="mr-2">
                                <Image src="/assets/Visualize-logos_transparent.png" alt="Visualize logo" width={160} height={40} />
                            </div>
                        </a>
                    )}
                    <button className="p-1 focus:outline-none text-gray-400 hover:bg-gray-200 rounded-md" onClick={handleToggle}>
                        {isCollapsed ? '>>' : '<<'}
                    </button>
                </div>
            </div>
            <ul className="flex-grow flex flex-col p-4">
                {isCollapsed && (
                    <a href="/">
                        <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md" onClick={() => console.log('Homepage clicked')}>
                            <Image src="/assets/Visualize-logos_transparent.png" alt="Visualize logo" width={160} height={40} className='rounded-md'/>
                        </li>
                    </a>)
                }
                <a href="/dashboard/analytics">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md" onClick={() => console.log('Analytics clicked')}>
                        <BarChart className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Analytics</span>
                    </li>
                </a>
                <a href="/dashboard/profile">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md" onClick={() => console.log('Profile clicked')}>
                        <AccountBox className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Profile</span>
                    </li>
                </a>
                <a href="/dashboard/settings">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md" onClick={() => console.log('Settings clicked')}>
                        <Settings className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Settings</span>
                    </li>
                </a>
            </ul>
        </div >
    );
};

export default SideMenu;
