import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Votingpage from './pages/votingpage/Votingpage'
import Adminpage from './pages/adminpage/Adminpage'
import AddCandidate from './pages/addcandidate/AddCandidate'
import RemoveCandidate from './pages/removecandidate/RemoveCandidate'

const App = () => {
  const router=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/votingpage",
        element:<Votingpage/>
    },
    {
        path:"/adminpage",
        element:<Adminpage/>
    },
    {
       path:"/addcandidate",
       element:<AddCandidate/> 
    },
    {
       path:"/removecandidate",
       element:<RemoveCandidate/> 
    },
  ])
  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
