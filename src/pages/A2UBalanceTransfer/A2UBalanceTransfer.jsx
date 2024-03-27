import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Skeleton, notification } from "antd";
import { useQuery } from "@tanstack/react-query";



const A2UBalanceTransfer = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [receiverEmail, setReceiverEmail] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const cashIndata = {
                receiverEmail: data.receiverEmail,
                amount: data.amount
            };
            console.log(cashIndata);
            // send Data to server
            const res = await axiosPublic.post('/agent/user/sendPoints', cashIndata);
            console.log("cash in", res.data);
            reset();
            notification.success("Success!", "Send points successfully")
        } catch (error) {
            console.error('Error sending data to server:', error);
            notification.error("Success!", "Something went wrong")
        }
    };

    const handleReceiverEmailChange = (event) => {
        setReceiverEmail(event.target.value);
    };

    const { data: receiverInfo = { info: [] }, isPending } = useQuery({
        queryKey: ['receiverInfo'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/search?email=${receiverEmail}`);
            return res.data;
        }
    });

    console.log("receiverInfo", receiverInfo);

    if (isPending) {
        return (
            <div className="bg-gray-100 border rounded py-5 px-2">
                <Skeleton active />
                <Skeleton active className="mt-4" />
            </div>
        );
    }








    return (
        <div>
            <Navbar></Navbar>
            <div className='md:flex justify-center mt-10 gap-5'>
                {/* send point div */}
                <div style={{ minWidth: "30%" }}>
                    <div className="flex rounded-lg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-lg">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <div className='flex justify-center'>
                                {/* <Image src={"/login.gif"} width={100} height={100} alt='logo' /> */}
                            </div>
                            <h2 className="mt-5 text-black text-center text-2xl font-bold leading-9 tracking-tight">
                                Send Points to Users
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                        Sender Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("email", { required: true })}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            defaultValue={user?.email}
                                            readOnly
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                        Receiver Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register("receiverEmail", { required: true })}
                                            value={receiverEmail}
                                            onChange={handleReceiverEmailChange}
                                            id="receiverEmail"
                                            name="receiverEmail"
                                            type="email"
                                            autoComplete="receiverEmail"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                            amount
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            {...register("amount", { required: true })}
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            autoComplete="amount"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        // disabled={isPending}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    > Send Points
                                        {/* {isPending ? 'Authenticating...' : 'Sign in'} */}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* user info div */}
                <div style={{ minWidth: "30%" }}>
                    <div className="flex rounded-lg min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white shadow-lg">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-5 mb-5 text-black text-center text-2xl font-bold leading-9 tracking-tight">
                                Receiver Information
                            </h2>
                            <div className='flex justify-center'>
                                {
                                    receiverInfo?.data?.avatar?.url ?
                                        <img className="w-full h-[200px]" src={receiverInfo?.data?.avatar?.url} alt="user image" />
                                        :
                                        <img className="w-[200px]" src={"https://i.postimg.cc/gjW7PqPL/user.png"} alt="self Image" />
                                }
                            </div>

                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-md font-semibold">Name: {receiverInfo?.data?.name}</h2>
                            <h2 className="text-md font-semibold">Email: {receiverInfo?.data?.email}</h2>
                            <h2 className="text-md font-semibold">Mobile: {receiverInfo?.data?.mobile}</h2>
                            <h2 className="text-md font-semibold">Balance: {receiverInfo?.data?.balance}</h2>
                            <h2 className="text-md font-semibold">Bonus Balance: {receiverInfo?.data?.bonusBalance}</h2>
                            <h2 className="text-md font-semibold">Dus Balance: {receiverInfo?.data?.dueBalance}</h2>
                            <h2 className="text-md font-semibold">Role: {receiverInfo?.data?.role}</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default A2UBalanceTransfer;