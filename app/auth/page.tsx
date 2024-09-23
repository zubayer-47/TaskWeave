'use client';

import useAuth from '@/hooks/useAuth';
import { useFormState } from 'react-dom';

export default function Auth() {
	const { signin } = useAuth();
	const [formState, action] = useFormState(
		(_state: unknown, formData: FormData) => {
			const data = {
				email: formData.get('email'),
				password: formData.get('password'),
			};

			signin(data.email || '', data.password || '');

			console.log({ data });
		},
		undefined
	);

	console.log({ formState });

	return (
		<div className='flex flex-col gap-7 justify-center items-center h-screen select-none'>
			<div className='text-center space-y-2'>
				<h1 className='text-primary-foreground font-adlam-display text-6xl'>
					Sign In
				</h1>

				<h3 className='font-adlam-display text-xl'>
					Authenticate to manage your project efficiently
				</h3>
			</div>
			<span className='font-adlam-display text-xl'>Sign In with Google</span>

			<div>
				<form action={action} className='flex flex-col gap-2'>
					<input
						name='email'
						type='email'
						className='px-3 py-2.5 focus:outline-none rounded-lg bg-slate-300 text-slate-900'
						placeholder='your username / email'
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
			</div>
		</div>
	);
}
