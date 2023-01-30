import LoginPage from "../LoginPage";
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter} from 'react-router-dom';
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

configure({adapter: new Adapter()});

it('renders correctly', () => {
   const div = document.createElement('div');
   ReactDOM.render(<BrowserRouter><ToastProvider><LoginPage/></ToastProvider></BrowserRouter>, div)
   ReactDOM.unmountComponentAtNode(div);
  });
