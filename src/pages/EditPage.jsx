import { useNavigate } from 'react-router-dom'
import { Button, Row, Col, Card } from 'antd'
import EditForm from '../components/EditForm.jsx'

function EditPage() {
    const navigate = useNavigate()
    return (
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: '100vh', padding: '0 20px' }}
        >
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                <EditForm navigate={navigate} />
            </Col>
        </Row>
    )
}

export default EditPage
