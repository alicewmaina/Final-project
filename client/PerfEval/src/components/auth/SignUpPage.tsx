import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { SignUpData } from '../../types/auth';
import toast from 'react-hot-toast';

interface SignUpPageProps {
  onSwitchToLogin: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ onSwitchToLogin }) => {
  const { signup, isLoading } = useAuth();

  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
    role: 'employee',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignUpData>>({});

  const departments = [
    'Engineering', 'Design', 'Product', 'Marketing',
    'Sales', 'Human Resources', 'Finance', 'Operations', 'Customer Success'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SignUpData> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: 'Weak', color: 'text-red-600' };
    if (password.length < 10) return { strength: 2, label: 'Fair', color: 'text-yellow-600' };
    return { strength: 3, label: 'Strong', color: 'text-green-600' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const { email, password, name, department, role } = formData;
      await signup({ email, password, name, department, role });
  
      toast.success('Account created! Please log in.');
      onSwitchToLogin(); // ✅ Show login form
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed. Try again.';
      toast.error(message);
      setErrors({ email: message });
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join PerfEval Pro</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* === Full Name === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>

            {/* === Email === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.email}
                </p>
              )}
            </div>

            {/* === Password === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  placeholder="Create password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {formData.password && (
                <p className={`text-sm mt-1 ${passwordStrength.color}`}>
                  {passwordStrength.label} password
                </p>
              )}
              {errors.password && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.password}
                </p>
              )}
            </div>

            {/* === Confirm Password === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                  placeholder="Confirm password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500">
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* === Department & Role === */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className={`w-full p-3 border rounded-lg ${errors.department ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select department</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {errors.department}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              {['employee', 'manager'].map(role => (
                <label key={role} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={role}
                    checked={formData.role === role}
                    onChange={() => handleInputChange('role', role)}
                  />
                  <span className="capitalize">{role}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2024 PerfEval Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
