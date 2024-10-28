import { Form, Button, Input, message } from 'antd'
import { resetPassword } from '../api/authApi.js'

const onFinish = async (values, navigate) => {
    console.log(values)
    const formData = new FormData()
    formData.append('old_password', values.old_password)
    formData.append('new_password', values.new_password)

    try {
        await resetPassword(formData)
        message.success('Password reset successfully!')
        navigate('/dashboard')
    } catch (error) {
        message.error(`Failed to reset password: ${error.message}`)
    }
}

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
}

const validateMessages = {
    required: '${label} is required!',
}

function ResetPasswordForm({ navigate }) {
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
                name="old_password"
                label="Old Password"
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
                name="new_password"
                label="New Password"
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
                label="Confirm New Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                !value ||
                                getFieldValue('new_password') === value
                            ) {
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
                    Reset Password
                </Button>
                <Button
                    onClick={() => navigate('/dashboard')}
                    type="primary"
                    htmlType="submit"
                    style={{
                        margin: '10px',
                        background: 'red',
                        color: 'white',
                    }}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ResetPasswordForm
