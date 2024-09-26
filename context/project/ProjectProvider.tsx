import { createContext, useContext, useState } from "react";
import dummyData from "@/lib/data.json";
import { ProjectType } from "@/types/project";

const initProjectData: ProjectType = {
	...dummyData,
	moveTask: () => { },
}

const ProjectContext = createContext<ProjectType | null>(null);

export const useProject = () => {
	return useContext(ProjectContext);
};

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
	const [project, setProject] = useState<ProjectType>(initProjectData);

	const moveTask = (task_id: string, stage_id: string, prev_stage_id: string, position: number) => {
		// toast.success('Task moved successfully');

		const newData = { ...project };

		const prev_stage = newData.stages.find((stage) => stage.stage_id === prev_stage_id);

		if (prev_stage) {
			const prev_task = prev_stage.tasks.find((task) => task.task_id === task_id);
			
			if (prev_task) {
				prev_stage.tasks = prev_stage.tasks.filter((task) => task.task_id !== task_id);

				const new_stage = newData.stages.find((stage) => stage.stage_id === stage_id);

				if (new_stage) {

					prev_task.stage_id = stage_id;

					new_stage.tasks.splice(position, 0, prev_task);
				}
			}
		}
		
		console.log({ stages: newData.stages });

		setProject(newData);
	};

	return <ProjectContext.Provider value={{ ...project, moveTask }}>{children}</ProjectContext.Provider>;
};

export default ProjectProvider;