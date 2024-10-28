import { Form, Button, Input, message } from 'antd'
import { loginUser } from '../api/authApi'

const onFinish = async (values, navigate) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('password', values.password)

    try {
        const token = await loginUser(formData)
        message.success('Login successful!')
        console.log('Access token:', token)

        localStorage.setItem('access_token', token)

        navigate('/dashboard')
    } catch (error) {
        message.error(
            'Login failed. Please check your credentials and try again.'
        )
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

function LoginForm({ navigate }) {
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{}}
            onFinish={(values) => onFinish(values, navigate)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ margin: '10px' }}
                >
                    Login
                </Button>
                Dont have account? <a href="/register">Register now!</a>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
