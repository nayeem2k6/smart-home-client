

import { Navigate, useLocation } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user,loading  } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <div>loading..</div>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
