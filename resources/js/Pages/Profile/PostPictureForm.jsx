import InputFile from '@/Components/InputFile'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';



export default function PostPictureForm()
{

    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        user_id: user.id,
        description: null,
        tags: null,
        image: null
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.store.picture'));
    };

    function setTags(e)
    {
        let tags = e.target.value

        tags = tags.replaceAll(' ', '#')

        let splittedTags = tags.split('#')
        splittedTags = splittedTags.filter(function (el) {
            return el != ""
        })
        setData('tags', splittedTags)
    }

    return (
        <form onSubmit={submit}>
            <InputFile onChange={e => setData('image', e.target.files[0])} className="py-5"/>

            <div className="w-full text-center">
                <InputLabel 
                    htmlFor="description"
                    className="text-left px-6"
                    value="Description"
                />

                <TextInput
                    id="description"
                    onChange={e => setData('description', e.target.value)}
                    className="px-6 py-3 m-2"
                    placeholder="Write description here"
                />

                <InputLabel
                    htmlFor="tags"
                    className="text-left px-6"
                    value="Tags"
                />

                <TextInput
                    id="tags"
                    onChange={e => setTags(e)}
                    className="px-6 py-3 m-2"
                    placeholder="Write tags here"
                />
                <PrimaryButton disabled={processing}>Upload photo</PrimaryButton>
            </div>
            <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
        </form>
    )
}