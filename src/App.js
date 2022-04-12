import './App.css';
import {Navbar,Footer} from './components'
import { About, Home,Profile,Item, Srs1, Create,Login,Register} from './pages'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/srs1" element={<Srs1 />} />
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
