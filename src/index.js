import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import "../node_modules/bootstrap/js/dist/modal.js"
import "../node_modules/bootstrap/js/src/dropdown.js"
import "../node_modules/bootstrap/js/src/util/scrollbar"
import "../node_modules/bootstrap/dist/js/bootstrap.esm"
import { Provider } from 'react-redux';
import {store }from "./store/store"
import { GetInitialState } from './Component/NavbarComponent/CartRedux'; 
import {ProductSlice} from "./Component/ProductAction/ProductSlice";
store.dispatch(ProductSlice.endpoints.getProducts.initiate())
// store.dispatch(UserSlice.endpoints.getUsers.initiate())
store.dispatch(GetInitialState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={   <App />}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
