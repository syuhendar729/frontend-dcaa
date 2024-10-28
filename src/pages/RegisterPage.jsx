import { Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm.jsx'

function RegisterPage() {
    const navigate = useNavigate()
    return (
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: '100vh',
                padding: '0 20px',
            }}
        >
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <RegisterForm navigate={navigate} />
            </Col>
        </Row>
    )
}

export default RegisterPage
