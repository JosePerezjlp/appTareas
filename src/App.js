import { BrowserRouter , Route, Routes } from 'react-router-dom';
import EditTaskPage from './pages/EditTaskPages';
import HomePages from './pages/HomePages';
import routes from './config/settings/routes';

function App() {
  return (      
           <BrowserRouter>
     <Routes>
      <Route element={<HomePages />} path={routes.home} />
      <Route element={<EditTaskPage/> } path={routes.editTask} />
    </Routes>
    </BrowserRouter>  

  );
}

export default App;
