import HomePage from "../HomePage";
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import renderer from 'react-test-renderer'


it('renders correctly', () => {
   const div = document.createElement('div');
   ReactDOM.render(<BrowserRouter><ToastProvider><HomePage/></ToastProvider></BrowserRouter>, div)
   ReactDOM.unmountComponentAtNode(div);
  });


