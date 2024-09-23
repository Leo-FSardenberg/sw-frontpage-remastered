import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { Obra } from './pages/Obra'
import { TBD } from './pages/Tobedone'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/manga/:mangaId',
    element: <Obra />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/tbd',
    element: <TBD />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
