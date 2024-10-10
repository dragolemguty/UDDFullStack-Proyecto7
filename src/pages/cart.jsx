import { useState, useEffect } from 'react';
import axios from 'axios';
import PayPalButton from '../components/payPalButton';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState('');

    useEffect(() => {
        axios.get(`$(import.meta.env.VITE_BASE_URL)/cart`)
            .then(res => setProducts(res.data))
            .catch(error => console.log(error));
    }, []);

    const addProduct = () => {
        axios.post(`$(import.meta.env.VITE_BASE_URL)/cart`, { name: newProducts })
            .then(res => setProducts(res.data))
            .catch(error => console.log(error));
    };

    return (
        <>
            <div>
                <h1>Carrito de Compras</h1>
                <ul>
                    {products.map((product, index) => (
                        <li key={index}>{product.name}</li>
                    ))}
                </ul>
                <input
                    type='text'
                    value={newProducts}
                    onChange={(e) => setNewProducts(e.target.value)}
                    placeholder='Agregar un Producto'
                />
                <button onClick={addProduct}>Agregar</button>

            <PayPalButton total={products.length * 10} />
            </div>
    </>
    );

};
export default Cart;
