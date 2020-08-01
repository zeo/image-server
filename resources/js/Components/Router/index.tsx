import React, {Component, ComponentType} from "react";
import {BrowserRouter, Switch, Route as RouterRoute} from "react-router-dom";
import NotFound from "../../Pages/Errors/NotFound";
import AuthRoutes from "./Routes/AuthRoutes";
import MainRoutes from "./Routes/MainRoutes";

export interface Route {
    paths: string;
    component: ComponentType;
}

export default class Router extends Component {
    renderRoute(route: Route, key: number): JSX.Element {
        return (
            <RouterRoute exact component={route.component} key={key} path={route.paths}/>
        );
    }

    render(): JSX.Element {
        return (
          <BrowserRouter>
              <Switch>
                  {MainRoutes.map(this.renderRoute)}
                  {AuthRoutes.map(this.renderRoute)}

                  <RouterRoute component={NotFound}/>
              </Switch>
          </BrowserRouter>
        );
    }
}