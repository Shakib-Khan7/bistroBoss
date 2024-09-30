import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu,isPending,refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem =  (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if(res.data.deletedCount > 0){
                 //   
                 refetch()
                }
                


              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });

    }



    const handleUpdateItem = (item)=>{

    }
    return (
        <div>
            <h2>Manage items</h2>
            <SectionTitle heading='Manage All items' subHeading='Hurry up'></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Image</th>
                            <th>Item name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item,i)=>
                                <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={item.image} />
                                        </div>
                                    </div>
                                    
                                </div>
                            </td>
                            <td>
                               {item.name}
                                
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <Link to={`/dashboard/updateItem/${item._id}`} onClick={()=>handleUpdateItem(item)} className="btn">Update</Link>
                            </td>
                            <td>
                                <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                </button>
                            </td>
                        </tr>
                            )
                        }
                        
                        
                       
                    </tbody>
                   
                </table>
            </div>
        </div>
    );
};

export default ManageItems;