import TaskStage from './partials/TaskStage';

const ProjectContent = () => {
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
					tasks={[
						{ id: '1', text: 'Hello Urgent Priority', priority: 'urgent' },
						{ id: '2', text: 'Hello High Priority', priority: 'high' },
						{ id: '3', text: 'Hello Medium Priority', priority: 'medium' },
						{ id: '4', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '5', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '6', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '7', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '8', text: 'Hello Normal Priority', priority: 'normal' },
					]}
					task_header_bg='blue'
				/>
				<TaskStage task_header_bg='warning' />
				<TaskStage task_header_bg='slate' />
				<TaskStage
					tasks={[
						{ id: '1', text: 'Hello Urgent Priority', priority: 'urgent' },
						{ id: '2', text: 'Hello High Priority', priority: 'high' },
						{ id: '3', text: 'Hello Medium Priority', priority: 'medium' },
						{ id: '4', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '5', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '6', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '7', text: 'Hello Normal Priority', priority: 'normal' },
						{ id: '8', text: 'Hello Normal Priority', priority: 'normal' },
					]}
					task_header_bg='success'
				/>
				<TaskStage task_header_bg='rose' />
			</div>
		</div>
	);
};

export default ProjectContent;

/**
<div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
  <div className="bg-task-stage-warning py-2 text-center font-inter font-semibold text-white">
    In Progress
  </div>
</div>
<div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
  <div className="bg-task-stage-slate py-2 text-center font-inter font-semibold text-white">
    Review
  </div>
</div>
<div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
  <div className="bg-success-button py-2 text-center font-inter font-semibold text-white">
    Done
  </div>
</div>
<div className="bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full">
  <div className="bg-rose-500 py-2 text-center font-inter font-semibold text-white">
    Stuck
  </div>
</div>
*/
