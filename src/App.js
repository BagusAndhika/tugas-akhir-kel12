import './App.css';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Headphone from './headphone/headphone';
import Keyboard from './keyboard/keyboard';
import Monitor from './monitor/monitor';
import Mouse from './mouse/mouse';

export default function App () {
  return(
    <BrowserRouter>
      <header>
        <div className="title">
          <p>Kelompok 12</p>
        </div>
        <nav>
          <Link className="text" to="/">
            Headphone
          </Link>
          <Link className="text navtext2" to="/keyboard">
            Keyboard
          </Link>
          <Link className="text " to="/monitor">
            Monitor
          </Link>
          <Link className="text navtext2" to="/mouse">
            Mouse
          </Link>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact component={Headphone} />
        <Route path="/keyboard" component={Keyboard} />
        <Route path="/monitor" component={Monitor} />
        <Route path="/mouse" component={Mouse} />
      </Switch>
    </BrowserRouter>
  );
}