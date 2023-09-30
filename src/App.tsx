import './App.css';
import { Link, Outlet, Routes, Route}  from 'react-router-dom';
// import { About } from './components/About';
// import Store from './components/Store';
// import Home from './components/Home';
import { ComponentType, lazy, Suspense} from 'react';

const Home = lazy(()=> wait(1000).then(():Promise<{default: ComponentType<any>}>=>import("./components/Home")));
const Store = lazy(()=> wait(1000).then(():Promise<{default: ComponentType<any>}>=>import("./components/Store")));
const About = lazy(()=> wait(1000).then(
  () => import("./components/About")
.then(module=>{
  return {default: module.About};
})
));

function NavWrapper():JSX.Element{
  return (
    <>
      <nav style={{display: "flex", gap: "1rem"}}>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

const App = ():JSX.Element => {
  return (
    <>
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<NavWrapper />}>
          <Route index element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
};


function wait(time:number):any{
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}


export default App;
