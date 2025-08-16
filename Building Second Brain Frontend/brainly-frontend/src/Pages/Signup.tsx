// import { Input } from "../component/Input";
// import { Button } from "../component/ui/Button";

// export function Signup(){
//     return (
//         <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center items-center">
//             <div className="mb-8 text-center">
//                 <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
//                 <p className="text-gray-600">Signup in Brainly App</p>
//             </div>
//             <div className="bg-white shadow-md rounded-lg p-10  min-w-96">
//                 <div className="space-y-6">
//                     <Input placeholder="Username" />
//                     <Input placeholder="Password" type="password" />
//                 </div>
//                 <div className="flex flex-col items-center pt-6">
//                     <Button variant="secondary" text="Signin" size="md" fullwidth={true} loading={false}/>

//                 </div>
//             </div>
//         </div>
//     )
// }
import { isAxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "../component/Input";
import { Button } from "../component/ui/Button";
import { useState } from "react";
import { SignupFunction } from "../api/user.api";

export function Signup(){
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const handleSignin = async() =>{

        try{
            setError("")
            if(username.trim() != "" && password.trim() != ""){
                const data = await SignupFunction({username,password});
                
                console.log(data);
                navigate({to:'/'})
                
                
            }
            else{
                setError("Username and password cannot be empty.");
            }

        }
        catch(e){
            if (isAxiosError(e)) {
                
                // Now TypeScript knows `e` is an AxiosError.
                // You can safely access `e.response`.
                if (e.response && e.response.data && e.response.data.Error_Detail) {
                    
                    setError(e.response.data.Error_Detail.password || e.response.data.Error_Detail.name);
                    
                }
                else {
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
                <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
                <p className="text-gray-600">Sigup to Brainly App</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-10  min-w-96">
                <div className="space-y-6">
               {error &&  <div className="bg-red-300 text-lg text-center font-roboto w-96 rounded-md">{error}</div>}
                    <Input placeholder="Username" onChange={(name)=>setUsername(name)} />
                    <Input placeholder="Password" type="password" onChange={(value)=>setPassword(value)}/>
                </div>
                <div className="flex flex-col items-center pt-6">
                    <Button variant="secondary" text="Signup" size="md" fullwidth={true} loading={false} onClick={handleSignin}/>
                </div>
            </div>
        </div>
    )
}