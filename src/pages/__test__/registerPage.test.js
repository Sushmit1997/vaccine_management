import RegisterPage from "../RegisterPage";
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


it('renders correctly', () => {
   const div = document.createElement('div');
   ReactDOM.render(<BrowserRouter><ToastProvider><RegisterPage/></ToastProvider></BrowserRouter>, div)
   ReactDOM.unmountComponentAtNode(div);
  });