import request from '@/utils/request.js'



export const GetCityJson = (data) => {
    return request("/release/filte", 'post', data)
} 