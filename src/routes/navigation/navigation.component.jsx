import { Outlet, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCartOpen } from "../../store/cart/cart.selector";

import { ReactComponent as CrownLogo } from "../../assets/logo.svg"
import { signOutStart } from "../../store/user/user.action";

import './navigation.style.scss';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    // console.log(currentUser);
    const isCartOpen = useSelector(selectCartOpen);
    const dispatch = useDispatch();

    const signOutUser = () => dispatch(signOutStart())

    return (
        <div>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrownLogo className='logo'/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) : <Link className="nav-link" to='/auth'>SIGN IN</Link>
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>

            <Outlet/>
        </div>
    )
}

export default Navigation