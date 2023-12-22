import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import Dashboard from './pages/Dashboard'
import CharCreator from './pages/CharCreator'
import Missing from './pages/Missing'
import TextEditor from './pages/TextEditor'
import Logout from './components/Logout'

export default function App() {

    return (
        <Routes>
            {/* Public routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* Protected routes */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth />}>
                    <Route element={<Navbar />}>
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/char' element={<CharCreator />} />
                        <Route path='/documents/:id' element={<TextEditor />} />
                    </Route>
                </Route>
            </Route>

            {/* Error route for wrong URLs */}
            <Route path='*' element={<Missing />} />
        </Routes>
    )
}