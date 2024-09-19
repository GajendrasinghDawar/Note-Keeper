import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/components/InputLabel';
import MarkDownEditor from "@/Components/MarkdownEditor";

export default function NoteForm({ data, setData, handleSubmit }) {

    return (
        <form onSubmit={ handleSubmit } className="  gap-1 space-y-6 text-gray-gray11 justify-start	min-w-full">
            <section className="flex justify-between items-center md:flex-row flex-col-reverse w-full gap-3">
                <div className="md:grow w-full">
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        id="title"
                        title="title"
                        type="text"
                        value={ data.title }
                        onChange={ (e) => setData(prevData => ({ ...prevData, title: e.target.value })) }
                        placeholder="Title"
                        className="mt-1 py-1 px-2 focus:outline-none  block w-full text-sand-sand11"
                        autoComplete="title"
                    />
                </div>
            </section>
            <div className="">
                <MarkDownEditor value={ data.content } setData={ setData } />
            </div>

            <PrimaryButton
                type="submit"
                className='ml-1'
            >
                post note
            </PrimaryButton>
        </form>
    );
}
