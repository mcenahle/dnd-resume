import { Navigate, createBrowserRouter } from 'react-router'

import { RootLayout } from '@/routes/layouts/root-layout'
import { EditorPage } from '@/routes/editor/page'
import { ViewPage } from '@/routes/view/page'
import { PrintPage } from '@/routes/print/page'
import { NotFoundPage } from '@/routes/not-found/page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/editor"
            replace
          />
        ),
      },
      { path: 'editor', element: <EditorPage /> },
      { path: 'view', element: <ViewPage /> },
      { path: 'print', element: <PrintPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
