import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import EditPage from './pages/EditPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            <PrivateRoute>
                                <EditPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/reset-pw"
                        element={
                            <PrivateRoute>
                                <ResetPasswordPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
