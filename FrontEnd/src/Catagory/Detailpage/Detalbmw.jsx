import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './dtlbmw.module.scss';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ProductCard from '../../Components/CarProductCard/ProductCard';


const Detalbmw = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { note_id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with ID: ${note_id}`);
                const response = await axios.get(`http://localhost:8000/api/notes/${note_id}`);
                console.log('API response:', response.data);
                const data = response.data;
                if (data && data.getById) {
                    setProduct(data.getById);
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('An error occurred while fetching the product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [note_id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!product) {
        return <div className={styles.error}>Product not found.</div>;
    }

    return (
        <div className={styles.detailContent}>
            <div className={styles.productDetails}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>Price: {product.price}$</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.category}>Category: {product.category}</p>
                    <div className={styles.ratings}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStarHalfAlt />
                    </div>
                    <div className={styles.btns}>
                        <button>Add to Bag</button>
                        <button>Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className={styles.otherProducts}>
                <h1>VIEW OUR OTHER PRODUCTS</h1>
                <div className={styles.cards}>
                    <ProductCard />
                </div>
            </div>
        </div>
    );
};

export default Detalbmw;
