import Task from "./Task";
import type { StageType } from "@/types/project";


type Props = {
	stages?: StageType[];
};

const task_header_bgs: Record<string, string> = {
	'Ready to Start': 'bg-primary-foreground',
	'In Progress': 'bg-task-stage-warning',
	'Completed': 'bg-success-button',
	'Review': 'bg-task-stage-slate',
	"Stuck": 'bg-rose-500',
};

export default function TaskStage({ stages }: Props) {
	return (
		<>
			{stages?.map((stage) => (
				<div className='bg-task-stage-bg h-full rounded-[2rem] overflow-hidden min-w-64 w-full' key={stage.stage_id}>
					<div
						className={`py-2 text-center font-inter font-semibold text-white ${task_header_bgs[stage.name]}`}
					>
						{stage.name}
						<span className={`${stage.tasks?.length ? 'inline-block' : 'hidden'}`}>
							- {stage.tasks?.length || ''}
						</span>
					</div>

					<div className='h-full pb-10 overflow-y-auto scrollbar-thin scrollbar-track-dark scrollbar-thumb-border'>
						{!stage.tasks?.length ? (
							<h1 className='p-3 text-gray-600 text-center font-adlam-display'>
								No Task Exist
							</h1>
						) : (
							stage.tasks.map((task) => <Task key={task.task_id} task={task} />)
						)}
					</div>
				</div>
			))}
		</>
	);
}
