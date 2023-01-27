
import './App.css';
import RouterComponent from './router/routes';
import { title } from 'process'
import { ToastProvider } from 'react-toast-notifications';


function App() {
  return (
    <div className="App">
      <ToastProvider autoDismiss={true}>
        <RouterComponent title={title} />
      </ToastProvider>
    </div>

  );
}

export default App;
