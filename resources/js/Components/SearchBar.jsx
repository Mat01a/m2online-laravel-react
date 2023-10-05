import { useEffect, useState } from 'react'
import { useForm, router } from '@inertiajs/react'

export default function SearchBar({placeholder = '', bunchOfUsers, abc}) {
    const [input, setInput] = useState(null)
    const {data, setData, get} = useForm()

    router.on('invalid', (event) => {
        event.preventDefault()
    })

    function setSearchBar(e)
    {
        get(route('search', e.target.value), {
             preserveState: true,
             replace: true,
            })
    }
    return (
        <>
        <input onChange={(e) => {
            setSearchBar(e)
        }} className="my-auto p-1 bg-gray-900 rounded-full text-white px-4 w-64 focus:w-96 transition-all" placeholder={placeholder}/>
        </>
    )
}