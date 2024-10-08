"use client"

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { UserInfo } from 'firebase/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import {app} from '@/lib/firebase/config';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: UserInfo | null;
    loading: boolean;
    login: (username: string, password: string) => void;
    register: (username: string, password: string, fullname: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    // const pathname = usePathname()
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const auth = getAuth(app)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)

            setLoading(false)
        })

        return () => unsubscribe()
    }, [user, router])

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)
            const auth = getAuth(app)
            await signInWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            setUser(user)
            toast.success('Logged in successfully')
            
            router.push('/dashboard')
        } catch (error) {
            setLoading(false)
            toast.error('Invalid Credentials')
            console.error(error)
        }
    };

    const register = async (email: string, password: string, fullname: string) => {
        try {
            setLoading(true)
            const auth = getAuth(app)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(userCredential.user, {
                displayName: fullname
            })

            const user = auth.currentUser
            setUser(user)
            router.push('/dashboard')
        } catch (error) {
            setLoading(false)
            console.error(error)

            toast.error('Something went wrong')
        }
    };

    const logout = async () => {
        try {
            setLoading(true)
            const auth = getAuth(app)
            await signOut(auth)
            setUser(null)
            router.push('/')
        } catch (error) {
            setLoading(false)
            console.error(error)

            toast.error('Something went wrong')
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
