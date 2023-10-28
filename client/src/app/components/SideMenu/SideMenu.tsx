'use client';

import React, { useState } from 'react';
import { BarChart, Settings, AccountBox } from '@mui/icons-material';
import Image from 'next/image';

const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`bg-white h-screen flex flex-col ${isCollapsed ? 'w-16' : 'w-40 md:w-64'}`}>
            <div className="p-4 flex items-center justify-between">
                <div className='flex items-center'>
                    {!isCollapsed && (
                        <a href="/">
                            <div className="mr-2">
                                <Image src="/assets/Visualize-logos_transparent.png" alt="Visualize logo" width={160} height={40} layout="responsive" onClick={() => setIsCollapsed(!isCollapsed)} className={`text-xl font-bold text-gray-800 ${isCollapsed ? 'block' : 'block'}`} />
                            </div>
                        </a>
                    )}
                    <button className="p-1 focus:outline-none text-gray-400 hover:bg-gray-200 rounded-md" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? '>>' : '<<'}
                    </button>
                </div>
            </div>
            <ul className="flex-grow flex flex-col justify-start p-4">
                <a href="/dashboard/analytics">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md">
                        <BarChart className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Analytics</span>
                    </li>
                </a>
                <a href="/dashboard/profile">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md">
                        <AccountBox className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Profile</span>
                    </li>
                </a>
                <a href="/dashboard/settings">
                    <li className="p-1 flex items-center cursor-pointer my-2 hover:bg-gray-200 rounded-md">
                        <Settings className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                        <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Settings</span>
                    </li>
                </a>
            </ul>
        </div>
    );
}

export default SideMenu;