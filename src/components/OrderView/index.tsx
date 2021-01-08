import React, { useEffect, useState } from 'react'
import Order, {IOrder} from '../../service/order'
import Category, {ICategory} from '../../service/category'
import OrderState from '../../service/order_state'
import { IProduct } from '../../service/product'

export interface OrderViewProps {
    token: string
}

export default function OrderView(props: OrderViewProps) {
    const [mounted, setMounted]: [boolean, any] = useState(true)
    const [orders, setOrders]: [Array<IOrder>, any] = useState([])
    const [categories, setCategories]: [any, any] = useState({})
    const [orderStates, setOrderStates]: [any, any] = useState([])

    const getOrders = () => {
        Order.getAll(props.token).then(res => {
            setOrders(res.data)
        })
    }

    useEffect(() => {
        if (mounted) {
            
            getOrders()

            Category.getAll().then(res => {
                setCategories(
                    res.data.reduce((acc: any, cur: ICategory) => {
                        acc[cur.id] = cur.name

                        return acc
                    }, {})
                )
            })

            OrderState.getAll().then(res => {
                setOrderStates(res.data)
            })
        }

        return () => {setMounted(false)}
        //eslint-disable-next-line
    }, [mounted])

    return (
        <>
            {orderStates.map((state: any) => (
            <>
            <h3>{state.name}</h3>

            {orders.filter((order: IOrder) => order.state_id === state.id).length === 0 ? (
                <div className="row p-2">There are no orders :(</div>
                ) : orders.filter((order: IOrder) => order.state_id === state.id).map((order: IOrder) => (
                    <>
                        <div className="row p-2 d-flex align-items-center">
                            <div>Order #{order.id}</div>
                            <div className="btn-group ml-4">
                            </div>
                        </div>
                        <div className="row mt-2">
                            <table className="table col-12 col-md-3">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>{order.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{order.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{order.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td>{order.date}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{order.list.reduce((acc: number, curr: any) => acc + curr.product.price*curr.count,0)}$</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row mb-5">
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.list.map((item: {product: IProduct, count:number}) => (
                                        <tr key={item.product.id}>
                                            <td>{item.product.name}</td>
                                            <td>{item.product.description}</td>
                                            <td>{item.product.price}</td>
                                            <td>{item.product.weight}</td>
                                            <td>{categories[item.product.category_id]}</td>
                                            <td>{item.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ))}
                </>
            ))}
        </>
    )
}