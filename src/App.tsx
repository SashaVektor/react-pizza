import Loadable from 'react-loadable';
import React, { Suspense } from "react";
import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";


// const Basket = React.lazy(() => import(/* webpackChunkName: "Basket" */'./pages/Basket'))
const Basket = Loadable({
  loader: () => import(/* webpackChunkName: "Basket" */'./pages/Basket'),
  loading: () => <div>Loading...</div>,
})

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'))



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="basket" element={<Basket />} />
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Loading...</div>}><FullPizza /></Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;

