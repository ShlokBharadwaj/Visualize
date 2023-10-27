'use client';

import React, { useState } from 'react';
import { BarChart, Settings, AccountBox } from '@mui/icons-material';
import Image from 'next/image';

const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`bg-white w-64 h-screen flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="p-4 flex items-center justify-between">
                <div className='flex items-center'>
                    {!isCollapsed && (
                        <div className="mr-2">
                            <Image src="/assets/Visualize-logos_transparent.png" alt="Visualize logo" width={160} height={40} layout="responsive" className="text-xl font-bold text-gray-800" />
                        </div>
                    )}
                    <button className="p-1 focus:outline-none text-black" onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? '>>' : '<<'}
                    </button>
                </div>
            </div>
            <ul className="flex-grow flex flex-col justify-start p-4">
                <li className="p-4 flex items-center cursor-pointer">
                    <BarChart className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                    <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Analytics</span>
                </li>
                <li className="p-4 flex items-center cursor-pointer">
                    <AccountBox className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                    <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Profile</span>
                </li>
                <li className="p-4 flex items-center cursor-pointer">
                    <Settings className={`text-gray-400 mr-2 ${isCollapsed ? 'block' : 'block'}`} />
                    <span className={`text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>Settings</span>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
