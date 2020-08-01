import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import Router from "./Components/Router";

export default class App extends Component {
    render(): JSX.Element {
        return (
          <Fragment>
              <Router/>
          </Fragment>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))