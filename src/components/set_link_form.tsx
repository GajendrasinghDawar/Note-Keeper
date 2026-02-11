import React, { useCallback, useState } from 'react'
import { Editor } from '@tiptap/react'

import Modal from './modal'
import Tooltip from './tooltip'
import { MenuButton } from './menu_button'
import { Cross2Icon, Link1Icon } from '@radix-ui/react-icons'
import TextInput from './text_input'

import InputLabel from './input_label'

interface SetLinkFormProps {
  editor: Editor
}

export function SetLinkForm({ editor }: SetLinkFormProps) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')

  function onOpenChange(open: boolean) {
    setOpen(open)
  }

  const setLink = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const previousUrl = editor.getAttributes('link').href
      setUrl(previousUrl || '')
      setOpen(true)
    },
    [editor]
  )

  const handleSubmit = () => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
    setOpen(false)
  }

  return (
    <>
      <Modal onOpenChange={onOpenChange} open={open}>
        <Modal.Trigger asChild>
          <Tooltip content={'Link'}>
            <MenuButton onClick={setLink} isActive={editor.isActive('link')}>
              <Link1Icon />
            </MenuButton>
          </Tooltip>
        </Modal.Trigger>
        <Modal.Content open={open}>
          <article className='flex flex-col  px-2 py-3 '>
            <section className='flex items-baseline gap-2 px-2 pt-2'>
              <Modal.Title className='text-slate12 m-0 text-base font-semibold'>
                Set Link
              </Modal.Title>
              <Modal.Description className='text-slate11 mb-5 font-medium text-sm leading-normal '>
                <span>Dialog for setting text's link .</span>
              </Modal.Description>
              <Modal.Close asChild>
                <button
                  className='text-slate11 
                                    hover:ring-slate9 
                                    focus:shadow-slate7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] ring-1 ring-slate7 appearance-none items-center justify-center rounded-full focus:ring-1 focus:ring-slate9 focus:outline-none mt-2 mr-2
                                    transition ease-in-out duration-150'
                  aria-label='Close'
                >
                  <Cross2Icon />
                </button>
              </Modal.Close>
            </section>
            <section className='space-y-5 px-2 s'>
              <div className=''>
                <InputLabel htmlFor='link' value='Link' />
                <TextInput
                  type='text'
                  id='link'
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder='e.g. https://example.com'
                  className='mt-1 py-1 px-2 focus:outline-none  block w-full text-slate11'
                  autoComplete='link'
                />
              </div>
              <div className='flex items-end justify-end gap-5 w-full'>
                <button
                  className={`
                                     inline-flex items-center px-4 py-2 bg-slate12  hover:opacity-95 border border-transparent
                                        font-semibold text-xs
                                        uppercase tracking-widest
                                        active:ring-slate12 focus:outline-none focus:ring-2
                                        focus:ring-slate12 focus:ring-offset-2
                                        transition ease-in-out duration-150 rounded-lg text-slate1 hover:text-slate2
   `}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <Modal.Close asChild>
                  <button
                    className=' inline-flex items-center px-4 py-2  bg-slate5 hover:bg-slate6  border border-transparent  font-semibold text-xs uppercase tracking-widest
                 hover:ring-slate8   active:bg-slate6 focus:outline-none focus:ring-2
                focus:ring-slate9 focus:ring-offset-2 
                transition ease-in-out duration-150 rounded-lg text-slate11 hover:text-slate12'
                  >
                    Cancel
                  </button>
                </Modal.Close>
              </div>
            </section>
          </article>
        </Modal.Content>
      </Modal>
    </>
  )
}
