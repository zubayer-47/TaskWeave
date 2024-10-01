'use client';

import useAuth from '@/hooks/useAuth';
import Input from '@/components/Input';
import Link from 'next/link';
import LoadingSpinner from '@/components/loader/LoadingSpinner';

export default function Register() {
    const { register, loading } = useAuth();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            fullname: formData.get('fullname'),
        };

        register(data.email as string, data.password as string, data.fullname as string);
    };

    console.log({loading})

    return (
        <>
            {loading && <LoadingSpinner />}

            <div className='flex flex-col gap-7 pb-20 justify-center items-center h-screen select-none'>
            <div className='text-center space-y-2'>
                <h1 className='text-primary-foreground font-adlam-display text-6xl'>
                    Sign Up
                </h1>

                <h3 className='font-adlam-display text-xl'>
                    Authenticate to manage your project efficiently
                </h3>
            </div>
            <div>
                <form onSubmit={onSubmit} className='flex flex-col gap-2'>
                    <Input
                        name='fullname'
                        type='text'
                        placeholder='your fullname'
                    />
                    <Input
                        name='email'
                        type='email'
                        placeholder='your email'
                    />
                    <Input
                        name='password'
                        type='password'
                        placeholder='your password'
                    />

                    <button
                        type='submit'
                        className='bg-primary-foreground hover:bg-primary-foreground/70 transition-colors py-2.5 rounded-lg text-gray-50 font-adlam-display text-lg mt-2'
                    >
                        {' '}
                        Submit{' '}
                    </button>
                </form>
                <Link href="/login" className='text-center block mt-2 underline text-primary-foreground hover:text-primary-foreground/70 transition-colors underline-offset-4 font-inter font-bold'>Login</Link>
                </div>
            </div>
        </>
    );
}
