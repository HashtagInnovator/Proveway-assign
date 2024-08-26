import React, { useState, useEffect } from 'react';
import '../styles/proveway.css';
import '../styles/animations.css';

const ProductOffer = () => {
    const [loading, setLoading] = useState(true);
    const [selectedOffer, setSelectedOffer] = useState(0);
    const [total, setTotal] = useState(0);
    const [customization, setCustomization] = useState([{ size: 'S', color: 'Black' }]);
    const [showToast, setShowToast] = useState(false);

    const offers = [
        { name: 'Buy 1 Get 2', price: 18.00, discount: 30, items: 1 },
        { name: 'Buy 2 Get 4', price: 24.00, discount: 30, items: 2 },
        { name: 'Buy 3 Get 6', price: 36.00, discount: 40, originalPrice: 40.00, items: 3 }
    ];

    useEffect(() => {
        calculateTotal();
        handleCustomization(offers[selectedOffer].items);

        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [selectedOffer]);

    const calculateTotal = () => {
        setTotal(offers[selectedOffer].price);
    };

    const handleCustomization = (items) => {
        const newCustomization = [];
        for (let i = 0; i < items; i++) {
            newCustomization.push({ size: 'S', color: 'Black' });
        }
        setCustomization(newCustomization);
    };

    const handleOfferChange = (index) => {
        setSelectedOffer(index);
    };

    const handleSelectChange = (index, field, value) => {
        const updatedCustomization = [...customization];
        updatedCustomization[index][field] = value;
        setCustomization(updatedCustomization);
    };

    const handleAddToCart = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <>
            {loading && (
                <div className="loading">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <div className="product-offer">
                <h2>YAY! It's BOGO</h2>

                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className={`offer-option ${selectedOffer === index ? 'selected' : ''} ${index === 1 ? 'popular' : ''}`}
                        onClick={() => handleOfferChange(index)}
                    >
                        <span className="discount">{offer.discount}% <p className='discount-off'>off</p></span>
                        <div className="offer-details">
                            <p>{offer.name}</p>
                            <p className="price">${offer.price.toFixed(2)} USD</p>
                        </div>
                        {index === 1 && <span className="popular-tag">Most Popular</span>}
                    </div>
                ))}

                <div className="offer-customization">
                    {customization.map((item, index) => (
                        <div key={index} className="custom-field">
                            <label>#{index + 1}</label>
                            <select
                                value={item.size}
                                onChange={(e) => handleSelectChange(index, 'size', e.target.value)}
                            >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <select
                                value={item.color}
                                onChange={(e) => handleSelectChange(index, 'color', e.target.value)}
                            >
                                <option value="Black">Black</option>
                                <option value="White">White</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                            </select>
                        </div>
                    ))}
                </div>

                <div className='delivery-flex'>
                    <p className="delivery-info text-pumper">Free Delivery</p>
                    <p className="total">Total: ${total.toFixed(2)} USD</p>
                </div>

                <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>

                <p className="powered-by">Powered by <span className='text-pumper'>Pumper</span></p>
            </div>
            {showToast && (
                <div className="toast show">
                    Item added to cart successfully!
                </div>
            )}
        </>
    );
};

export default ProductOffer;