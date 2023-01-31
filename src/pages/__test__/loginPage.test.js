import LoginPage from "../LoginPage";
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter} from 'react-router-dom';


it('renders correctly', () => {
   const div = document.createElement('div');
   ReactDOM.render(<BrowserRouter><ToastProvider><LoginPage/></ToastProvider></BrowserRouter>, div)
   ReactDOM.unmountComponentAtNode(div);
  });
