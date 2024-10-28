import { Form, Button, Input, Upload, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/authActions'
import {
    selectUser,
    selectLoading,
    selectError,
} from '../selectors/authSelectors'
import { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { updateUser } from '../api/authApi'

const onFinish = async (values, navigate) => {
    console.log(values)
    const formData = new FormData()
    formData.append('username', values.username)
    formData.append('email', values.email)
    if (values.profile_picture) {
        console.log('Ada data image')
        formData.append(
            'profile_picture',
            values.profile_picture.file.originFileObj
        )
    }

    try {
        await updateUser(formData)
        message.success('User data updated successfully!')
        navigate('/dashboard')
    } catch (error) {
        message.error(`Failed to update user data: ${error.message}`)
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

function EditForm({ navigate }) {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const loading = useSelector(selectLoading)
    const error = useSelector(selectError)

    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [file, setFile] = useState(null)
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }
    // const handleChange = ({ file: newFile }) => setFile(newFile)
    const handleChange = ({ file: newFile }) => {
        if (newFile.status === 'removed') {
            setFile(null) // Setel file ke null jika dihapus
        } else if (
            newFile.status === 'done' ||
            newFile.status === 'uploading'
        ) {
            setFile(newFile) // Atur file baru jika statusnya done atau uploading
        }
    }

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    // Pastikan user ada sebelum mencoba mengakses properti
    if (!user) return null

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                username: user.username, // Mengisi nilai default untuk username
                email: user.email, // Mengisi nilai default untuk email
            }}
            onFinish={(values) => onFinish(values, navigate)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
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
                name="profile_picture"
                label="Profile Picture"
                valuePropName="file"
            >
                <Upload
                    listType="picture-card"
                    file={file}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {file != null ? null : uploadButton}
                </Upload>
            </Form.Item>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                        margin: '10px',
                        background: 'green',
                        color: 'white',
                    }}
                >
                    Save
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

const uploadButton = (
    <button
        style={{
            border: 0,
            background: 'none',
        }}
        type="button"
    >
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </button>
)

export default EditForm
