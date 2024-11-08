"use client"

import { AuthContext } from '@/context/auth/AuthProvider';
import { useContext } from 'react';

const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

export default useAuth;
