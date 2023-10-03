import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PostPictureForm from '@/Pages/Profile/PostPictureForm'
import { Head, Link } from '@inertiajs/react' 
import { useEffect, useState } from 'react'

export default function Profile({ auth, user, pictures = null })
{
    const [isYourProfile, setIsYourProfile] = useState(null)
    const [header, setHeader] = useState(null)

    const images = (pictures != null) ? (pictures.map(image => 
        <Link href={route('picture.details', {id: image.id})}>
            <img className="w-80 float-left p-3 hover:scale-105 transition-all cursor-pointer" src={'/storage/images/' + image.image}/>
        </Link>
        )) : ('')
    function onYourProfile()
    {
        if (auth.user.id == user.id)
        {
            setIsYourProfile(true)
            return
        }
        setIsYourProfile(false)
    }


    useEffect(() => {
        onYourProfile()
        if(isYourProfile)
        {
            setHeader("Upload new photo")
        }
        else
        {

            setHeader('This is ' + user.id + ' profile')
        }
    })
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={header}
            >

            <Head title={'HI'}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3">
                                {isYourProfile ? (
                                    <PostPictureForm/>

                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="col-span-9">
                                {images}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </AuthenticatedLayout>
        </>
    )
}