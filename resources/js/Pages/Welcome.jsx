import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

const dummyTags = ['#awesome','#photo','#holiday']


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [dummyLikes, setDummyLikes] = useState(285553)
    const [isClicked, setIsClicked] = useState(false)

    const dummyTagsRender = dummyTags.map(tag => 
        <div className="inline-block float-left px-[2px] hover:text-blue-500 cursor-pointer">
            {tag}
        </div>
        )

    function Like()
    {
        return (
            isClicked ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 hover:stroke-none fill-red-500 cursor-pointer h-full inline-block hover:scale-125 transition-all">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current hover:stroke-none hover:fill-red-500 stroke-[1.5px] cursor-pointer h-full inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            )
        )
    }

    function likePhoto()
    {
        isClicked ? (setDummyLikes(dummyLikes - 1), setIsClicked(false)) : (setDummyLikes(dummyLikes + 1), setIsClicked(true))
    }
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-purple-100 dark:bg-amber-400 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {auth.user ? (
                        <>
                        <Link
                            href={route('home')}
                            className="font-semibold text-gray-600 rounded-full dark:bg-yellow-400 p-2 hover:text-gray-900 dark:text-black dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            App
                        </Link>

                        </>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 p-2 rounded-full dark:bg-amber-400 hover:text-gray-900 dark:text-black dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex grow">
                    <div className="h-screen w-[60%] pl-[15%] pt-[15%]">
                            <h1 className="text-black font-black lato text-7xl">
                                Upload photos
                            </h1>
                            <h3 className="inline-block text-4xl">
                                and check aesthetic for <Link
                                href={route('register')}
                                className="dark:bg-gray-900 rounded-full px-3 dark:text-amber-400 hover:text-white"
                                >
                                free.
                                </Link>
                            </h3>
                                    <div className="w-48 h-48 dark:bg-gray-900 my-5"></div>
                    </div>

                    <div className="flex dark:bg-gray-900 h-screen w-[40%]">
                        <div className="absolute dark:bg-gray-50 h-[50vh] w-[25%] right-[20%] top-[30%] drop-shadow-2xl">
                            <div className="m-6 w-[85%] h-[65%] dark:bg-purple-500 overflow-hidden">
                                <img className="w-full" src="/storage/photos/photo-2.jpg"/>
                            </div>
                            <div className="h-2 border-b border-gray-300 mx-8"></div>
                            <div className="grid grid-cols-12 px-8 w-full">
                                <div className="col-span-6 lato text-xl font-black">
                                    <div className="w-min hover:text-blue-500 transition-all cursor-pointer hover:scale-105">
                                    Mat01
                                    </div>
                                </div>

                                <div className="col-span-6 px-3">
                                    <div className="float-right w-full">
                                        <div onClick={likePhoto} className="w-min inline-block px-2">
                                        <Like/> 
                                        </div>
                                        {dummyLikes.toLocaleString('en-US')}

                                    </div>
                                </div>
                            </div>
                            <div className="px-8 w-full">
                                This is awesome!
                            </div>
                            <div className="text-sm text-gray-700 px-8 w-full">
                                {dummyTagsRender}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
