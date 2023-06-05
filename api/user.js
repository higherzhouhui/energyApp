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
export function updatePassword(params) {
	return request('/user/updatePassword', 'PUT', params)	
}
export function realName(params) {
	return request('/user/realName', 'PUT', params)	
}

export function resetPasswordRequest(params) {
	return request('/user/resetPassword', 'PUT', params)	
}

export function personalInfoRequest(params) {
	return request('/user/personalInfo', 'GET', params)	
}