import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './SharedComponents/Header/index';
import Dashboard from './Pages/Dashboard/index';
import Record from './Pages/Record/index';
import LessonRecordProvider from './Context/LessonRecord/lessonRecord.provider';
import AlertMessageCallProvider from './Context/AlertMessageCall/alertMessageCall.provider';
import Footer from './SharedComponents/Footer';
import Attributions from './Pages/Attributions';

function App() {
  return (
    <main className='app__container'>
      <LessonRecordProvider>
        <AlertMessageCallProvider>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/record' element={<Record />} />
            <Route path='/attributions'  element={<Attributions />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
        </AlertMessageCallProvider>
      </LessonRecordProvider>
    </main>
  )
}


export default App;

