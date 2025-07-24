import React from 'react';

const TaskTable: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
        + Add Task
      </button>
    </div>
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due date</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        <tr>
          <td className="px-4 py-2 text-sm text-gray-900">Task 1</td>
          <td className="px-4 py-2 text-sm text-gray-500">-</td>
          <td className="px-4 py-2 text-sm text-gray-500">-</td>
          <td className="px-4 py-2 text-sm text-gray-500">-</td>
          <td className="px-4 py-2 text-sm text-gray-500">TO DO</td>
          <td className="px-4 py-2 text-sm text-gray-500">-</td>
        </tr>
        {/* Add more rows dynamically */}
      </tbody>
    </table>
  </div>
);

export default TaskTable;
