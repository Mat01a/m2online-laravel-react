import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'


export default function Home({ auth, pictures, bunchOfUsers }) {
    const listItems = pictures.map(picture => 
        <Link key={picture.id} href={route('picture.details', {id: picture.id})} className="float-left inline-block col-span-3">
            <img className="w-80 float-left p-3 hover:scale-105 transition-all cursor-pointer" src={'/storage/images/' + picture.image}/>
        </Link>
    )

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                bunchOfUsers={bunchOfUsers}
            >
                
                <Head title="Home" />

                <div className="py-12 h-full w-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-12 gap-4 auto-cols-auto">
                            {listItems}
                </div>
            </div>
            </AuthenticatedLayout>
        </>
    )
}