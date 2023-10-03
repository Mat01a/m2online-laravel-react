import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function PictureDetails({ auth, details, author }) {
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        console.log(details)
    })

    function Like()
    {
        return (
            isClicked ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 hover:stroke-none fill-red-500 cursor-pointer h-full inline-block hover:scale-125 transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current hover:stroke-none hover:fill-red-500 stroke-[1.5px] cursor-pointer h-full inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            )
        )
    }

    return (
        <>

            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Image" />

                        <div className="mx-auto mt-3 pt-3 dark:bg-gray-50 h-[80vh] max-w-lg drop-shadow-2xl">
                            <div className="my-6 w-[85%] h-[65%] dark:bg-purple-500 overflow-hidden mx-auto">
                                <img className="w-full" src={"/storage/images/" + details.image}/>
                                {JSON.stringify(details)}

                            </div>
                            <div className="h-2 border-b border-gray-300 mx-8"></div>
                            <div className="grid grid-cols-12 px-8 w-full">
                                <div className="col-span-9 lato text-xl font-black">
                                    <div className="w-full hover:text-blue-500 transition-all cursor-pointer hover:scale-105">
                                    <Link href={route('profile.id', {id: author.id})}>
                                    {author.name}
                                    </Link>
                                    </div>
                                </div>

                                <div className="col-span-3 px-3">
                                    <div className="float-right w-full">
                                        <div className="w-min inline-block px-2">
                                        <Like/> 
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="px-8 w-full">
                                This is awesome!
                            </div>
                            <div className="text-sm text-gray-700 px-8 w-full">
                            </div>

                        </div>
            </AuthenticatedLayout>
        </>
    )
}