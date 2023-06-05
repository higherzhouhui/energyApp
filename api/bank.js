

import { request } from '@/utils/request.js' 
export function getUserCard(params) {
	return request('/user-card/getUserCard', 'GET', params)	
}
export function saveOrUpdateCard(params) {
	return request('/user-card/saveOrUpdateCard', 'POST', params)	
}
