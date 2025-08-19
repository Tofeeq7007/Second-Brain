import { useDispatch } from "react-redux"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./ui/Button"
import { Open } from "../store/features/ModalSlice"

export const Top_left_Corner = ()=>{
    const dispatch = useDispatch()
    return <>
        
            <div className="min-[900px]:visible hidden">  <Button startIcon={<ShareIcon size="md"/>} size="sm" variant="primary" text="Share Brain"/></div>
            <div className="mt-2">
                <Button  startIcon={<PlusIcon size="lg"/>} onClick={()=>{dispatch(Open())}} size="md" variant="secondary" text="Add Content"/>
            </div>    
    </>
}