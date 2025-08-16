import { isAxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../store/features/authSlice";
import { SigninFunction } from "../api/user.api";

export function Signin(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSignin = async() =>{

        try{
            setError("")
            if(username.trim() != "" && password.trim() != ""){
                const data = await SigninFunction({username,password});
                
                // console.log(data.token); // token mila
                // key = "token", value = "abc123"
                localStorage.setItem("token", data.token);

                dispatch(login(username));
                navigate({to:'/Home'})
            }
            else{
                setError("Username and password cannot be empty.");
            }

        }
        catch(e){
            if (isAxiosError(e)) {
                // Now TypeScript knows `e` is an AxiosError.
                // You can safely access `e.response`.
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError("An unexpected API error occurred.");
                }
            } else {
                // Handle non-Axios errors (e.g., network errors, coding mistakes)
                setError("An unexpected error occurred. Please try again.");
                console.error("An unexpected error:", e);
            }
        }
    }

    return (
        
        <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Welcome Back!</h1>
                <p className="text-gray-600">Sign in to continue to Brainly</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-10  min-w-96">
                <div className="space-y-6">
               {error &&  <div className="bg-red-300 text-lg text-center font-roboto rounded-md">{error}</div>}
                    <Input placeholder="Username" onChange={(name)=>setUsername(name)} />
                    <Input placeholder="Password" type="password" onChange={(value)=>setPassword(value)}/>
                </div>
                <div className="flex flex-col items-center pt-6">
                    <Button variant="secondary" text="Signin" size="md" fullwidth={true} loading={false} onClick={handleSignin}/>
                    <p className="mt-4 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <span 
                            className="font-medium text-purple-600 hover:text-purple-500 underline cursor-pointer" 
                            onClick={()=>navigate({to:'/signup'})}
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}