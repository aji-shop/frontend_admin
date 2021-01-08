import React, { useEffect, useState } from 'react'
import Order, {IOrder} from '../../service/order'
import Category, {ICategory} from '../../service/category'
import { IProduct } from '../../service/product'

export interface UnorderViewProps {
    token: string
}

export default function UnorderView(props: UnorderViewProps) {
    const [mounted, setMounted]: [boolean, any] = useState(true)
    const [orders, setOrders]: [Array<IOrder>, any] = useState([])
    const [categories, setCategories]: [any, any] = useState({})

    const getOrders = () => {
        Order.getByStatusId(props.token,2).then(res => {
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
        }

        return () => {setMounted(false)}
        //eslint-disable-next-line
    }, [mounted])

    const handleExecute = (id: string) => {
        Order.updateStatus(props.token, id, 4).then(res => {
            alert(JSON.stringify(res.data))
            getOrders()
        })
    }

    const handleCancel = (id: string) => {
        Order.updateStatus(props.token, id, 3).then(res => {
            alert(JSON.stringify(res.data))
            getOrders()
        })
    }

    return (
        <>
            {orders.length === 0 ? (<div className="row">There are no orders :(</div>) : orders.map((order: IOrder) => (
                <>
                    <div className="row p-2 d-flex align-items-center" key={order.id}>
                        <div>Order #{order.id}</div>
                        <div className="btn-group ml-4">
                            <button type="button" className="btn btn-success" onClick={() => {handleExecute(order.id)}}>Execute</button>
                            <button type="button" className="btn btn-danger" onClick={() => {handleCancel(order.id)}}>Cancel</button>
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
    )
}