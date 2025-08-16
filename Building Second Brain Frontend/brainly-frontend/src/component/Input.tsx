type InputProps = {
    type?:string
  placeholder: string;
  onChange?: (value: string) => void;
};
export function Input({placeholder,onChange,type} : InputProps){
    return (
    <div>
        <input 
            type={type ? type : "text"} 
            placeholder={placeholder} 
            onChange={onChange ? (e)=>onChange(e.target.value) : ()=>{}} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
    </div>
    )
}