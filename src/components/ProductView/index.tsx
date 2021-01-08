import React, { useState, useEffect } from 'react'
import Product, {IProduct} from '../../service/product'
import Category, {ICategory} from '../../service/category'
import Modal from '../Modal'

export interface ProductViewProps {
    token:string
}

export default function ProductView(props: ProductViewProps) {
    const [products, setProducts]: [Array<IProduct>, any] = useState([])
    const [categories, setCategories]: [any, any] = useState({})
    const [mounted, setMounted]: [boolean, any] = useState(true)
    const [isModalOpen, setIsModalOpen]: [boolean, any] = useState(false)

    const [editProductId, setEditProductId]: [number, any] = useState(-1)
    const [editPriceValue, setEditPriceValue]: [string, any] = useState('')
    const [editWeightValue, setEditWeightValue]: [string, any] = useState('')
    const [editCategoryIdValue, setEditCategoryIdValue]: [number, any] = useState(-1)

    const getProducts = () => {
        Product.getAll().then(res => {
            setProducts(res.data)
        })
    }

    useEffect(() => {
        if(mounted) {

            getProducts()
            
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
    }, [mounted])

    const handleEditButtonClick = (product: IProduct) => {
        setEditProductId(product.id)
        setEditPriceValue(product.price)
        setEditWeightValue(product.weight)
        setEditCategoryIdValue(product.category_id)
        setIsModalOpen(true)
    }

    const handleEditPriceValueChange = (event: any) => {
        setEditPriceValue(event.target.value)
    }

    const handleEditWeightValueChange = (event: any) => {
        setEditWeightValue(event.target.value)
    }

    const handleEditCategoryIdChange = (event: any) => {
        setEditCategoryIdValue(event.target.value)
    }

    const handleConfirm = () => {
        Product.update(props.token,
        {
            id: editProductId,
            price: Number(editPriceValue),
            weight: Number(editWeightValue),
            category_id: editCategoryIdValue
        }).then(res => {
            alert(JSON.stringify(res.data))
            Product.getAll().then(res => {
                setProducts(res.data)
            })
        })

        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setEditProductId(-1)
        setEditPriceValue('')
        setEditWeightValue('')
        setEditCategoryIdValue(-1)
        setIsModalOpen(false)
    }

    return (
        <div className="row">
            {isModalOpen ? (
                <Modal 
                title="EditWindow" 
                handleConfirm={handleConfirm} 
                handleCancel={handleCancel}
                >  
                    <form>
                        <div className="form-group">
                            <label htmlFor="editPriceInput">Price</label>
                            <input 
                                id="editPriceInput"
                                className="form-control"
                                type="text" 
                                value={editPriceValue}
                                onChange={handleEditPriceValueChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightPriceInput">Weight</label>
                            <input 
                                id="weightPriceInput"
                                className="form-control"
                                type="text" 
                                value={editWeightValue} 
                                onChange={handleEditWeightValueChange}/>
                        </div>
                        <select value={editCategoryIdValue} onChange={(event: any) => {handleEditCategoryIdChange(event)}}>
                            {Object.keys(categories).map(key => 
                                <option key={key} value={key}>{categories[key]}</option>    
                            )}
                        </select>
                    </form>
                </Modal>
            ) : null}
            
            <table className="table table-striped table-hover">
                <thead className="thead thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Category</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: IProduct) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price + '$'}</td>
                                <td>{product.weight}</td>
                                <td>{categories[product.category_id]}</td>
                                <td>
                                    <button className="btn btn-warning text-dark" onClick={() => {handleEditButtonClick(product)}}>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}