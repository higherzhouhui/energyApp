import { request } from '@/utils/request.js' 
export function getProjectList(params) {
	return request('/project/getProjectList', 'GET', params)	
}
export function buyProject(params) {
	return request('/project/buyProject', 'POST', params)	
}
