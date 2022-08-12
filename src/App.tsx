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
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/record' element={<Record />} />
            <Route path='/attributions'  element={<Attributions />} />
          </Routes>
        </BrowserRouter>
        </AlertMessageCallProvider>
      </LessonRecordProvider>
    </main>
  )
}


export default App;

