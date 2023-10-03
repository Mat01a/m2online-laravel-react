import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'

export default function SearchBar({placeholder = '', bunchOfUsers}) {
    const [input, setInput] = useState(null)
    const {data, setData, post} = useForm({
        input: ''
    })
    
    useEffect(() => {
        console.log(bunchOfUsers)
    })
    return (
        <>
        <input onChange={(e) => {
            setData('input', e.target.value)
        }} className="my-auto p-1 bg-gray-900 rounded-full text-white px-4 w-64 focus:w-96 transition-all" placeholder={placeholder}/>
        </>
    )
}