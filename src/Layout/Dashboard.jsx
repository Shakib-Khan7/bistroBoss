import React from 'react';
import { FaAd, FaCalendar, FaCalendarAlt, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils, FaVoicemail, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [cart] = useCart();

    //todo: get admin value from database
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            {/* sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to='/dashboard/adminHome'>
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/addItems'>
                                    <FaUtensils></FaUtensils>
                                    Add Items</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/manageItems'>
                                    <FaList></FaList>
                                    Manage Items</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/users'>
                                    <FaUsers></FaUsers>
                                    All users</NavLink>
                            </li>
                            <li>

                                <NavLink to='/dashboard/bookings'>
                                    <FaAd></FaAd>
                                    Manage Bookings</NavLink>
                            </li>
                            <hr />

                        </> :
                            <>
                                <li><NavLink to="/dashboard/home"><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservations"><FaCalendarAlt></FaCalendarAlt> Reservations</NavLink></li>
                                <li><NavLink to="/dashboard/history"><FaWallet></FaWallet> Payment History</NavLink></li>
                                <li>
                                    <NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart> My Cart
                                        <span className="badge inl badge-secondary">+{cart?.length || 0}</span>
                                    </NavLink>

                                </li>

                                <hr />
                                {/* shared navLinks */}

                            </>
                    }

                    <li>

                        <NavLink to='/'>
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/salad'>
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>

                        <NavLink to='/order/contact'>
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>









                </ul>

            </div>
            <div className='flex-1 p-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;