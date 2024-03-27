import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { notification } from "antd";


const ResetPassword = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        const resetData = {
            email: data.email,
            otp: data.otp,
            password: data.password
        }
        console.log(resetData);

        try {
            // post data to server
            const res = await axiosPublic.put('/password/reset', resetData);
            console.log(res.data);

            if (res.data.success === true) {
                console.log('reset password successfully');
                reset()
                navigate('/')
                notification.success("Success!", "Password reset successfully")
            }
        } catch (error) {
            // Handle errors
            console.error(error);
            notification.error("Error!", "Something went wrong")
        }

    };


    return (
        <div style={{
            backgroundImage: 'url(https://i.postimg.cc/pX1jkrGb/8722687.jpg)',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                minWidth: "30%",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className='flex justify-center'>
                        <h2 className="text-black text-center text-2xl font-semibold mt-5">Reset Password</h2>
                        {/* <div className="flex mr-50 items-center">
                            <img className="w-[100px] mt-10" src="https://i.postimg.cc/bNqqBfVz/image-13-1.png" alt="" />
                        </div> */}
                    </div>
                    {/* <h2 className="mt-5 text-black text-center text-md font-medium">
                        Enter your Email address. We'll send you a otp to reset your password
                    </h2> */}
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email", { required: true })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* otp code */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Enter Otp Code
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("otp", { required: true })}
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    autoComplete="otp"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* new password */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("password", { required: true })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="block px-3 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ResetPassword;