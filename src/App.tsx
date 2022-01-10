import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import history from './helper/history';
import store from './redux'
import Routing from './screen'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          {Routing.map(({ index, path, Component }, key) => {
            return (
              <Route key={key} index={index} path={path} element={<Component />} />
            )
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
