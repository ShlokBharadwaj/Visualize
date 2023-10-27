import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="w-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-gray-800 rounded-md py-2 px-4 w-full border outline-none"
        />
      </div>
    </header>
  );
};

export default Header;
