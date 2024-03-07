import {Row, Col} from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

const Profile = () => {
    const linkStyle = ({isActive}) =>{
        return {
            fontWeight : isActive ? 'bold' : 'normal',
            textDecoration: 'none',
            color: 'green'
        }
    }
  return (
    <div>
       <Row className='justify-content-center mb-5'>
        <Col sm={3}><NavLink to='' style={linkStyle}>Profile info</NavLink></Col>
        <Col sm={3}><NavLink to='orders' style={linkStyle}>My orders</NavLink></Col>
       </Row>
       <Outlet />
    </div>
  )
}

export default Profile
