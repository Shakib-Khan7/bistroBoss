import React, { useContext } from 'react';
import { AuthContex } from '../../providers/AuthProvider';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({item}) => {
    const {name,category,image,price,recipe,_id} = item
    const {user} = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()

    const [,refetch] = useCart()

    const handleAddToCart = food =>{
        console.log(food);
        if(user && user.email){
            //send cart item to database

        const cartItem= {
            menuId : _id,
            email : user.email,
            name,
            image,
            price
        }
        axiosSecure.post('/carts',cartItem)
        .then(res=>{
            console.log(res.data);
            if(res.data.insertedId){
                alert('item added')
                refetch()
            }
            //refetech cart to update cart count
        })


        }
        else{
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login',{state:{from:location}})
                }
              });
        }

    }
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <p className='bg-slate-900 text-white absolute right-5 top-4 px-4 rounded-full'>${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button
                        onClick={()=>handleAddToCart(item)}
                        className="btn btn-outline border-0 border-b-4 mt-5">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;