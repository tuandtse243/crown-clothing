import { useContext } from 'react';
import './cart-icon.style.scss'
import { ReactComponent as ShoppingIcon} from '../../assets/114 shopping-bag.svg'
import { CartContext } from '../../contexts/carts.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon