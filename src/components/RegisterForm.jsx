import { Form, Button, Input, message } from 'antd'
import { registerUser } from '../api/authApi.js'

const onFinish = async (values, navigate) => {
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('username', values.username)
    formData.append('password', values.password)

    try {
        const response = await registerUser(formData)
        message.success('Registration successful!')
        console.log('Registration response:', response)
        navigate('/dashboard')
    } catch (error) {
        console.log(error)
        message.error(`Registration failed. ${error}`)
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
}

function RegisterForm({ navigate }) {
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
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    'The new password that you entered do not match!'
                                )
                            )
                        },
                    }),
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
                    Regiter
                </Button>
                have account? <a href="/">Login now!</a>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm
