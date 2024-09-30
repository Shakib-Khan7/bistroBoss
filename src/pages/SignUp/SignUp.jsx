import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";



const SignUp = () => {

  const { createUser, updateUserProfile,logOut } = useContext(AuthContex)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()


  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user
        console.log(loggedUser);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            console.log('user profile updated');

            const userInfo = {
              name : data.name,
              email : data.email
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              if(res.data.insertedId){
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })











           
            logOut()
            .then(()=>{
              navigate('/login')
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  return (
    <div>
      <Helmet><title>Bistro Boss | Sign up</title></Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />

                {errors.name && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />

                {errors.photoURL && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input name="password" {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/



                })} type="password" placeholder="password" className="input input-bordered" required />
                {errors.password && <span className="text-red-500">Password must be 6 character</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have one upper case,onelower case and one digit character</span>}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign up" />

              </div>
            </form>
            <p className="px-6"><small>Already have an account? <Link to='/login'>Login</Link></small></p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;