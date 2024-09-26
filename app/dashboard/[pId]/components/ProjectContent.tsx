"use client"

import { ProjectType } from '@/types/project';
import TaskStage from './partials/TaskStage';
import { useProject } from '@/context/project/ProjectProvider';

const ProjectContent = () => {
	const { stages } = useProject() as ProjectType;

	return (
		<div className='col-span-10 bg-dashboard-bg rounded-3xl h-full pb-1 pt-3'>
			<h1 className='px-4 pb-3 text-white text-xl font-adlam-display'>
				OpWeave
			</h1>
			<hr className='border-b border-border' />
			<button
				type='button'
				className='bg-success-button hover:bg-success-button/80 transition-colors p-2 rounded-md mx-4 my-2 text-white font-inter font-semibold'
			>
				Create Task
			</button>

			<div className='flex items-center gap-4 px-4 pb-1 dashboard-content-height w-full overflow-x-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border'>
				<TaskStage
					stages={stages}
					
				/>
			</div>
		</div>
	);
};

export default ProjectContent;

/**
 * Ready to start
 * In progress
 * Review
 * Done
 * Stuck
 */
