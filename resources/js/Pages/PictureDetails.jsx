import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
import { useState, useEffect } from "react"
import LikeForm from './Profile/LikeForm'
export default function PictureDetails({ auth, details, author, is_liked, number_of_likes }) {

    return (
        <>

            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Image" />

                        <div className="mx-auto mt-3 pt-3 dark:bg-gray-50 h-[80vh] max-w-lg drop-shadow-2xl">
                            <div className="my-6 w-[85%] h-[65%] dark:bg-purple-500 overflow-hidden mx-auto">
                                <img className="w-full h-full" src={"/storage/images/" + details.image}/>

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
                                            <LikeForm
                                                auth={auth}
                                                details={details}
                                                is_liked={is_liked}
                                            />
                                        </div>
                                        {number_of_likes}

                                    </div>
                                </div>
                            </div>
                            <div className="px-8 w-full">
                                {details.description}
                            </div>
                            <div className="text-sm text-gray-700 px-8 w-full">
                            </div>

                        </div>
            </AuthenticatedLayout>
        </>
    )
}