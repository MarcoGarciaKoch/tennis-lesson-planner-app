import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/login';
import Dashboard from './Pages/Dashboard/index';
import Record from './Pages/Record/index';
import Attributions from './Pages/Attributions';
import LessonRecordProvider from './Context/LessonRecord/lessonRecord.provider';
import AlertMessageCallProvider from './Context/AlertMessageCall/alertMessageCall.provider';
import Register from './Pages/Auth/register';
import Validate from './Pages/Auth/validate';
import RequireAuth from './Core/auth/auth.component';


function App() {
  return (
    <main className='app__container'>
      <LessonRecordProvider>
        <AlertMessageCallProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='/register' element={<Register />} />
            <Route path='/validate' element={<Validate />} />
            <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path='/record' element={<RequireAuth><Record /></RequireAuth>} />
            <Route path='/attributions'  element={<RequireAuth><Attributions /></RequireAuth>} />
          </Routes>
        </BrowserRouter>
        </AlertMessageCallProvider>
      </LessonRecordProvider>
    </main>
  )
}


export default App;

