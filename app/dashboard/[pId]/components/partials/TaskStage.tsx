import Task from "./Task";
import type { TaskType } from "@/lib/types";

type Props = {
	task_header_bg: 'warning' | 'success' | 'blue' | 'slate' | 'rose';
	tasks?: TaskType[];
};

const task_header_bgs = {
	blue: 'bg-primary-foreground',
	warning: 'bg-task-stage-warning',
	success: 'bg-success-button',
	slate: 'bg-task-stage-slate',
	rose: 'bg-rose-500',
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
					tasks.map((task) => <Task key={task.task_id} task={task} />)
				)}
			</div>
		</div>
	);
}
