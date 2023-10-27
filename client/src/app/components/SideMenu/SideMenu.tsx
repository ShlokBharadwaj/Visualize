import React from 'react';
import { BarChart, Settings, AccountBox } from '@mui/icons-material';

const SideMenu = () => {
    return (
        <div className="bg-white w-64 h-screen flex flex-col">
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            </div>
            <ul className="flex-grow flex flex-col justify-start p-4">
                <li className="p-4 flex items-center">
                    <BarChart className="text-gray-400 mr-2" />
                    <span className="text-gray-800">Analytics</span>
                </li>
                <li className="p-4 flex items-center">
                    <AccountBox className="text-gray-400 mr-2" />
                    <span className="text-gray-800">Profile</span>
                </li>
                <li className="p-4 flex items-center">
                    <Settings className="text-gray-400 mr-2" />
                    <span className="text-gray-800">Settings</span>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
