import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'


export default function Home({ auth,  pictures }) {
    const listItems = pictures.map(picture => 
        <Link key={picture.id} href={route('picture.details', {id: 1})}>
            <img className="w-80 float-left p-3 hover:scale-105 transition-all cursor-pointer" src={'/storage/images/' + picture.image}/>
        </Link>
    )

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
            >
                
                <Head title="Home" />

                <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="p-6 text-gray-900">
                            {listItems}
                        </div>
                </div>
            </div>
            </AuthenticatedLayout>
        </>
    )
}