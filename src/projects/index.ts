import { Base } from '../base';
import { Pagination } from '../base';
import { projectRequest, projectResult, updateProjectRequest } from '../schemas';

type ProjectsParams = Pagination & {
	completed?: boolean;
	name?: string;
	number?: string;
};

const resourceName = 'projects';

export class Projects extends Base {
	getProjects(params?: ProjectsParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<projectResult[]>(`${resourceName}${query ? `?${query}` : ''}`);
	}

	createProject(project: projectRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project),
		});
	}

	getProject(projectId: number) {
		return this.request<projectResult>(`${resourceName}/${projectId}`);
	}

	updateProject(projectId: number, project: updateProjectRequest) {
		return this.request<void>(`${resourceName}/${projectId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project),
		});
	}

	deleteProject(projectId: number) {
		return this.request<void>(`${resourceName}/${projectId}`, {
			method: 'DELETE',
		});
	}
}
