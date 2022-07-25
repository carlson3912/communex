import './App.css';
import {Navbar,Footer} from './components'
import { About, Home,Profile,Item, Srs1, Create,Login,Register, Submit, Guidelines, Product, Vote, Design, Opening, Redeem, PublicProfile, SubmissionPage, PurchasePage} from './pages'
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  let data = [{name:'fattei'},{},{}]
  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/srs1" element={<Srs1 />} />
            <Route path="/" element={<Home />} />
            <Route path="/opening" element={<Opening />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/submit" element={ <Submit />} />
            <Route path="/submit/guidelines" element={ <Guidelines />} />
            <Route path="/product" element={ <Product />} />
            <Route path="/vote" element={ <Vote />} />
            <Route path="/design" element={ <Design />} />
            <Route path="/redeem" element={ <Redeem />} />
            <Route path="/:userId" element={ <PublicProfile />} />
            <Route path='/:userId/:submissionPage' element = {<SubmissionPage/>} />
            <Route path='/drip/:purchasePage' element = {<PurchasePage/>} />
          </Routes>
      <Footer />
    </div>
  );
}
export default App;
