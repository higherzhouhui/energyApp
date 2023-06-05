import { request } from '@/utils/request.js' 
export function loginRequest(params) {
	return request('/user/login', 'GET', params)	
}
export function personalInfo(params) {
	return request('/user/personalInfo', 'GET', params)	
}
export function registerRequest(params) {
	return request('/user/register', 'POST', params)	
}


