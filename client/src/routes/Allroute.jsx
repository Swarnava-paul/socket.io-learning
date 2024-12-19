import {Route , Routes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const Allroute = ({users,selfSocketId}) => {
  return (
    <Routes>
       <Route path='/dashboard' element={<Dashboard users={users} selfSocketId={selfSocketId}/>}/>
    </Routes>
  )
}

export default Allroute
