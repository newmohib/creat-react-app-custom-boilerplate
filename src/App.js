import React from 'react';
import { BrowserRouter  } from 'react-router-dom';
import Header from './Components/headerFooter/header';
import Footer from './Components/headerFooter/footer';
import HomeRouter from './Routers/homeRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Resources/css/style.css';

function App() {

  return (
    <BrowserRouter>
      <main role="main" className="flex-shrink-0">
        <Header />
        <HomeRouter />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
