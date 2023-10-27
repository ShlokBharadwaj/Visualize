import React from 'react';
import { SearchOutlined, LightModeOutlined, AccountCircleOutlined, NotificationsOutlined } from '@mui/icons-material';

const Header = () => {
  return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center">
      <div className="w-full">
        <SearchOutlined className="absolute left-6 top-7 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-gray-800 rounded-md py-3 px-4 w-full border outline-none pl-10"
        />
        <AccountCircleOutlined className="absolute right-6 top-7 text-gray-400" />
        <NotificationsOutlined className="absolute right-14 top-7 text-gray-400" />
        <LightModeOutlined className="absolute right-[5.5rem] top-7 text-gray-400" />
      </div>
    </header>
  );
};

export default Header;
