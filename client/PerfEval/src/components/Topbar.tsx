import React from 'react';

const Topbar: React.FC = () => (
  <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
    <input className="border rounded px-3 py-1 w-1/3" placeholder="Search everything..." />
    <div>
      {/* Add quick actions, user avatar, etc. */}
      <button className="ml-4 px-3 py-1 bg-blue-600 text-white rounded">+ Create</button>
    </div>
  </header>
);

export default Topbar;
