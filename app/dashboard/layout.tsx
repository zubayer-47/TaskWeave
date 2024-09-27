import Image from 'next/image';
import Link from 'next/link';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section id='dashboard' className='bg-dark'>
			<div className='h-screen flex flex-col gap-3 justify-center px-5'>
				<div className='flex justify-between items-center'>
					<Link href='/'>
						<Image
							src='/task-weave-logo.webp'
							width={150}
							height={21.94}
							alt='Dashboard Feature Image'
							priority
						/>
					</Link>

					<Image
						src='/zubayer.jpg'
						className='rounded-full'
						width={50}
						height={50}
						alt='Dashboard Feature Image'
						priority
					/>
				</div>
				{children}
			</div>
		</section>
	);
}
