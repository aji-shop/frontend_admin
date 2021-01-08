import axios, { AxiosResponse } from 'axios'

export interface IOrder {
    id: string,
    date: string,
    state_id: number,
    name: string,
    email: string,
    phone: string,
    list: any
}

export default class Order {
    static getAll(token: string): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/orders',{headers: {
            token:token
        }})
    }

    static getByStatusId(token: string, id:number): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/orders/status/' + id, {headers: {
            token: token
        }})
    }

    static updateStatus(token: string, id: string, state_id: number): Promise<AxiosResponse<any>> {
        return axios.put('http://localhost:8080/orders/status', {
            token: token,
            id: id,
            state_id: state_id
        })
    }
}