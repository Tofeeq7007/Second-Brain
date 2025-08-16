import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "../Input";
import { PostContent } from "../../api/user.api";
interface ContentModal{
    open:boolean,
    onclose:()=>void
}
export function CreateContentModal({open,onclose}:ContentModal){
    const ref = useRef<HTMLDivElement>(null);
    
function solve(e:React.MouseEvent<HTMLDivElement>) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
        onclose();
    }
}
    const [title , setTitle] = useState("");
    const [error,setError] = useState("");
    const [link , setLink] = useState("");
    const [type, setType] = useState("");
    const [tag, setTag] = useState("");
    const id = localStorage.getItem('token');
    async function AddNewContent() {

        try{

            if(title.trim() != "" && link.trim() != "" && type!="" && tag.trim() != ""){
                type.toLowerCase()
                const data = await PostContent(id as string ,{title,link,type,tag})
                
                console.log(data);
                alert(data.message);
                onclose();
                setError("")
                location.reload()
            }        
            else {
                setError("Title , Link , type and tag cannot be empty.");
            }
        }
        catch(e){
            setError("Enter valid Url")
            console.log(e);
            
        }
           
    }
    return (
        <>
        {open && <div>

            <div onClick={(e)=>solve(e)} className="w-screen h-screen bg-slate-500 opacity-60  fixed top-0 left-0  flex justify-center">

            </div>

            <div onClick={(e)=>solve(e)} className="w-screen h-screen   fixed top-0 left-0  flex justify-center">
                <div ref={ref} className="flex flex-col size-150  justify-center">
                    <span className="bg-white opacity-100 p-4  border-slate-500  border-2 shadow-lg rounded-xl">
                            <div className="flex justify-end">
                                <div className="cursor-pointer" onClick={onclose}>
                                    <CrossIcon size="lg"/>
                                </div>
                            </div>
                        {error != "" && <div className="bg-red-300 rounded text-xl text-center">
                            {error}
                        </div>}
                        {/* Input Component */}
                        <div className="pt-2 flex flex-col gap-2">

                        <Input placeholder={"Title"} onChange={(v)=>setTitle(v)}/>
                        <Input placeholder={"link"} onChange={(v)=>setLink(v)}/>
                        <Input placeholder={"Type"} onChange={(v)=>setType(v)}/>
                        <Input placeholder={"tag (Optional !)"} onChange={(v)=>setTag(v || "Not Mention")}/>
                        </div>
                        <div className="flex justify-center mt-10">

                            <Button variant="secondary" text="Submit" size="md" onClick={AddNewContent}/>
                        </div>
                    </span>

                </div>
            </div>
        </div>
        }
        </>
    )
    // return {{onclose} && <div> hi</div>}
}
