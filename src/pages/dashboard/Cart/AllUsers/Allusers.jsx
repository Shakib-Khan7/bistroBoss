import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Allusers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [],refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data

        }
    })

    const handleDeleteUser = user=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                    refetch()
                })




              
            }
          });

    }

    const handleMakeAdmin = user=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    title: "Updated!",
                    text: `${user.name} is an Admin now`,
                    icon: "success"
                  });
            }
        })
    }




    return (
        <div>
            <div className='flex justify-evenly py-4'>
                <h2 className='text-3xl'>All users</h2>
                <h2 className='text-3xl'>Total Users : {users.length}</h2>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,i)=>
                            <tr key={user._id}>
                            <th>{i+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                            {
                                user.role === 'admin' ? <p>Admin</p> :
                                
                                <button onClick={()=>handleMakeAdmin(user)} className="btn btn-lg bg-orange-500">
                                    <FaUsers className='text-white'></FaUsers>
                                </button>}
                            </td>
                            <td>
                                <button onClick={()=>handleDeleteUser(user)} className="btn btn-ghost btn-lg">
                                    <FaTrashAlt className='text-red-600'></FaTrashAlt>
                                </button>
                            </td>
                        </tr>

                            )}
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Allusers;