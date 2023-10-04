import { useState, useEffect } from "react"
import { useForm, usePage } from '@inertiajs/react';

export default function LikeForm({auth, details, is_liked })
{

    const [isClicked, setIsClicked] = useState(is_liked)

    const { data, setData, post, delete: destroy, show, errors, processing, recentlySuccessful } = useForm({
        user_id: auth.user.id,
        picture_id: details.id
    })

    function likePhoto()
    {
        post(route('like.store'), {
            onSuccess: () => {
                setIsClicked(true)
            }
        })
    }

    function dislikePhoto()
    {
        destroy(route('like.destroy'), {
            onSuccess: () => {
                setIsClicked(false)
            }
        })
    }

    function Like()
    {
        return (
            (isClicked == true) ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 hover:stroke-none fill-red-500 cursor-pointer h-full inline-block hover:scale-125 transition-all" onClick={dislikePhoto}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current hover:stroke-none hover:fill-red-500 stroke-[1.5px] cursor-pointer h-full inline-block" onClick={likePhoto}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            )
        )
    }

    return (
        <>
        <Like/>
        </>
    )
}