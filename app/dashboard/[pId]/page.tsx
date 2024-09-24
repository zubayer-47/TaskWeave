import Link from 'next/link';
import ProjectContent from './components/ProjectContent';

export default function Project() {
	return (
		<div className='h-screen flex flex-col gap-3 justify-center'>
			<div className='grid grid-cols-12 gap-5'>
				<div className='col-span-2 bg-dashboard-bg rounded-3xl h-full'>
					<h1 className='px-4 py-3 text-white text-xl font-adlam-display'>
						My Works
					</h1>
					<hr className='border-b border-border' />

					<Link
						href='/dashboard/opweave'
						className='flex items-center gap-2 px-4 py-3 hover:bg-border/30 transition-colors'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='text-border'
						>
							<polyline points='15 10 20 15 15 20' />
							<path d='M4 4v7a4 4 0 0 0 4 4h12' />
						</svg>

						<h2 className='text-white font-inter font-semibold'>OpWeave</h2>
					</Link>
				</div>
				<ProjectContent />
			</div>
		</div>
	);
}
