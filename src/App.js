import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, link } from "react-router-dom"
import Dashboard from './Components/Dashboard';
import AuthProvider from './Context/loginauth';
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </Router>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
