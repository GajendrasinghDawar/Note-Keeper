import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Create from "@/Pages/notes/Create";
import ErrorPage from "@/Pages/ErrorPage";

import App from './app'
import Index, { loader as IndexLoader } from './notes/Index'
import Show, { loader as ShowLoader } from '@/Pages/notes/Show';
import Edit, { loader as EditLoader } from '@/Pages/notes/Edit';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader: IndexLoader,
      },
      {
        path: "note/create",
        element: <Create />,
      },
      {
        path: "note/:noteId",
        element: <Show />,
        loader: ShowLoader,
      },
      {
        path: "note/:noteId/edit",
        element: <Edit />,
        loader: EditLoader,
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
)
