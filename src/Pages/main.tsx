import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Create from '@/Pages/notes/create'
import ErrorPage from '@/Pages/error_page'

import App from './app'
import Index, { loader as IndexLoader } from './notes/index'
import Show, { loader as ShowLoader } from '@/Pages/notes/show'
import Edit, { loader as EditLoader } from '@/Pages/notes/edit'
import { NotFound } from '@/components/not_found'
import MarkdownViewer from '@/Pages/viewer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />,
        loader: IndexLoader,
      },
      {
        path: 'viewer',
        element: <MarkdownViewer />,
      },
      {
        path: 'note/create',
        element: <Create />,
      },
      {
        path: 'note/:noteId',
        element: <Show />,
        loader: ShowLoader,
      },
      {
        path: 'note/:noteId/edit',
        element: <Edit />,
        loader: EditLoader,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
