type Task = {
	id: string;
	text: string;
	priority: 'normal' | 'medium' | 'high' | 'urgent';
};

type Props = {
	task_header_bg: 'warning' | 'success' | 'blue' | 'slate' | 'rose';
	tasks?: Task[];
};

const task_header_bgs = {
	blue: 'bg-primary-foreground',
	warning: 'bg-task-stage-warning',
	success: 'bg-success-button',
	slate: 'bg-task-stage-slate',
	rose: 'bg-rose-500',
};

const task_priorities = {
	urgent: {
		background: 'bg-rose-400',
		foreground: 'bg-rose-600',
	},
	high: {
		background: 'bg-yellow-400',
		foreground: 'bg-yellow-500',
	},
	medium: {
		background: 'bg-blue-400',
		foreground: 'bg-primary-foreground',
	},
	normal: {
		background: 'bg-emerald-400',
		foreground: 'bg-success-button',
	},
};

export default function TaskStage({ task_header_bg, tasks }: Props) {
	return (
		<div className='bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full'>
			<div
				className={`py-2 text-center font-inter font-semibold text-white ${task_header_bgs[task_header_bg]}`}
			>
				Ready to Start{' '}
				<span className={`${tasks?.length ? 'inline-block' : 'hidden'}`}>
					- {tasks?.length || ''}
				</span>
			</div>

			<div className='h-full pb-10 overflow-y-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border'>
				{!tasks?.length ? (
					<h1 className='p-3 text-gray-600 text-center font-adlam-display'>
						No Task Exist
					</h1>
				) : (
					tasks.map((task) => (
						<div
							className='m-2 p-3 rounded-2xl bg-task-item-bg space-y-3 relative'
							key={task.id}
						>
							<div className='text-white/90'>{task.text}</div>
							<div
								className={`flex items-center gap-1.5 bg-opacity-20 w-fit px-2 py-1.5 rounded-full ${
									task_priorities[task.priority].background
								}`}
							>
								<span
									className={`h-5 w-5 rounded-full inline-block ${
										task_priorities[task.priority].foreground
									}`}
								></span>
								<span className='text-white/80 font-inter font-medium capitalize'>
									{task.priority}
								</span>
							</div>

							<div className='flex justify-end'>
								<button type='button' className=''>
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
										className='text-white/60'
									>
										<path d='M12 20h9' />
										<path d='M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z' />
										<path d='m15 5 3 3' />
									</svg>
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
