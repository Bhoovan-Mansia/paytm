const InputBox = ({label, placeholder, Val, setVal}) => {

  return (
    <div> 
      <div className="text-sm font-medium text-left py-2">
          {label}
      </div>
      <input 
        placeholder={placeholder} 
        className="w-full px-2 py-1 border rounded border-slate-200" 
        value={Val}
        onChange={(e) => {setVal(e.target.value)}}/>
    </div>
  )
}

export default InputBox