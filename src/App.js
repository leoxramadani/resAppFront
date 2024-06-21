import './App.css';
import Navbar from './components/Navbar/Navbar';
import TableCard from './components/Cards/TableCard'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Kamarierat from './pages/Kamarierat/Kamarierat';
import OrderContextProvider from './store/orderContext';
import Porosite from './pages/Porosite/Porosite';
import { Login } from './pages/Login/Login';
import Produktet from './pages/Produktet/Produktet';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {


  
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <OrderContextProvider>
        {/* <TableCard/> */}
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/tables" element={<TableCard />} />
            <Route path="/kamarierat" element={<Kamarierat/>} />
            <Route path="/porosite" element={<Porosite/>} />
            <Route path="/produktet" element={<Produktet/>} />
          </Routes>
        </BrowserRouter>
        </OrderContextProvider>
      </QueryClientProvider>
    </div>


  );
}

export default App;
