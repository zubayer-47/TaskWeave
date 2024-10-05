'use client';

import LoadingSpinner from '@/components/loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

function Login() {
	const { login, loading } = useAuth();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const data = {
			email: formData.get('email'),
			password: formData.get('password'),
		};

		login(data.email as string, data.password as string);
	};

	return (
		<>
			{loading && <LoadingSpinner />}

			<div className='flex flex-col gap-7 pb-20 justify-center items-center h-screen select-none'>
				<div className='text-center space-y-2'>
					<h1 className='text-primary-foreground font-adlam-display text-6xl'>
						Sign In
					</h1>

					<h3 className='font-adlam-display text-xl'>
						Authenticate to manage your project efficiently
					</h3>
				</div>
				{/* <span className='font-adlam-display text-xl'>Sign In with Google</span> */}

				<div>
					<form onSubmit={onSubmit} className='flex flex-col gap-2'>
						<input
							name='email'
							type='email'
							className='px-3 py-2.5 focus:outline-none rounded-lg bg-slate-300 text-slate-900'
							placeholder='your email'
						/>
						<input
							name='password'
							type='password'
							className='px-3 py-2.5 focus:outline-none rounded-lg bg-slate-300 text-slate-900'
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
					<Link href="/register" className='text-center block mt-2 underline text-primary-foreground hover:text-primary-foreground/70 transition-colors underline-offset-4 font-inter font-bold'>Register</Link>
				</div>
			</div>
		</>
	);
}

export default Login