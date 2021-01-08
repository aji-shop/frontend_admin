import axios, { AxiosResponse } from 'axios'

export default class OrderState {
    static getAll(): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/status')
    }
}