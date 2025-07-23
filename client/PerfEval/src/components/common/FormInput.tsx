import React from 'react';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);