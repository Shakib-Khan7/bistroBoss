import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure, { axiosSecure } from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        //image upload to imgbb and get the url
        const imageFile = {image : data.image[0]}
        

        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        })
        if(res.data.success){
            //now send the menu item data to the server with the image url
            const menuItem = {
                name : data.name,
                category : data.category,
                price : parseFloat(data.price),
                recipe : data.recipe,
                image : res.data.data.display_url


            }
            //

           const menuResponse = await axiosSecure.post('/menu',menuItem)
           console.log(menuResponse.data);
           if(menuResponse.data.insertedID){
            
            //show scuusess
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item added",
                showConfirmButton: false,
                timer: 1500
              });
              reset()
        }
        }
        console.log('with img url',res.data)
        
    }



    return (
        <div>
            <SectionTitle heading='add an item'
                subHeading="What's New">

            </SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    
                    <label className="form-control w-full my-6 ">
                        <div className="label">
                            <span className="label-text">Recipe name*</span>
                            
                        </div>
                        <input required
                        {...register("name")}
                        
                        type="text" placeholder="Type here" className="input input-bordered w-full " />
                       
                    </label>

                  <div className="flex w-full">
                  <div>
                   <label> Category</label>
                   
                    

                   <select defaultValue="default" required {...register("category")} className="select select-bordered w-full ">
                       <option disabled value="default">Select a category</option>
                       <option value="salad">salad</option>
                       <option value="pizza">pizza</option>
                       <option value="soup">soup</option>
                       <option value="dessert">dessert</option>
                       <option value="drinks">drinks</option>

                   </select>
                   </div>

                    <div>
                    <label className="form-control w-full">
                       
                            <label className="label-text">price*</label>
                            
                        
                        <input required
                        {...register("price")}
                        
                        type="text" placeholder="Type here" className="input input-bordered w-full " />
                       
                    </label>
                    </div>
                    
                  </div>
                  <textarea required {...register("recipe")} className="textarea w-full border-1 border-black" placeholder="Bio"></textarea>
                  
                    

                    <div className="">
                    <input required {...register("image")} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-primary">Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;