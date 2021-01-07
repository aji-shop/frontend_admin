import axios, { AxiosResponse } from 'axios';

export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    weight: number,
    category_id: number
}

export default class Product {
    static getAll(): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/products')
    }

    static getById(id: number): Promise<AxiosResponse<any>> {
        return axios.get('http://localhost:8080/products/' + id)
    }

    static create(token: string, product: IProduct): Promise<AxiosResponse<any>> {
        return axios.post('http://localhost:8080/products', {
            data: {
                token: token,
                name: product.name,
                description: product.description,
                price: product.price,
                weight: product.weight,
                category_id: product.category_id
            }
        })
    }

    static update(token: string, product: {id: number, price: number, weight: number, category_id: number}): Promise<AxiosResponse<any>> {
        return axios.put('http://localhost:8080/products', {
                token: token,
                id: product.id,
                price: product.price,
                weight: product.weight,
                category_id: product.category_id
        })
    }
}