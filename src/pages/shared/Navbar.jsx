import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContex)
    const [cart] = useCart()
    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log(result.user);
            })
    }

    const navOptions = <>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
            <li><Link to='/menu'>Our Menu</Link></li>
            <li><Link to='/order'>Order</Link></li>
            {!user ? <li><Link to='/login'>Login</Link></li> : <li><button onClick={handleLogout}>Logout</button></li>}
            <li>
                            <Link to='/dashboard/cart'>
                                <button className="btn">
                                    <FaShoppingCart className=""></FaShoppingCart>
                                    <div className="badge badge-secondary mb-2">+{cart.length}</div>
                                </button>
                            </Link>
                        </li>


        </ul>
    </>
    return (
        <div>
            <div className="navbar fixed max-w-screen-xl z-10 bg-slate-950 bg-opacity-40  text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {navOptions}
                    </div>
                    <a className="btn btn-ghost text-xl">BistroBoss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/menu'>Our Menu</Link></li>
                        <li><Link to='/order/salad'>Order</Link></li>
                        <li>
                            <Link to='/dashboard/cart'>
                                <button className="btn">
                                    <FaShoppingCart className=""></FaShoppingCart>
                                    <div className="badge badge-secondary mb-2">+{cart.length}</div>
                                </button>
                            </Link>
                        </li>
                        {!user ?

                            <li><Link to='/login'>Login</Link></li> : <>
                                <li><button onClick={handleLogout}>Logout</button></li>
                                {/* <span>{user?.displayName}</span> */}
                            </>}

                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;