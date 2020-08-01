import React, {Component} from "react";
import {Link} from "react-router-dom";
import Auth from "../../Services/API/Auth";

export default class Login extends Component {
  login = (method: string): void => {
    Auth.login(method)
      .then((url) => {
        window.location = (url as Location);
      });
  }

  render(): JSX.Element {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow"/>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white pb-5 pt-1 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6">
              <div className="mt-6 grid grid-cols-2 gap-2">
                <div>
                  <span className="w-full inline-flex rounded-md shadow-sm">
                    <button type="button" onClick={() => this.login('github')}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out">
                      <i className="fab fa-github text-xl"/>
                    </button>
                  </span>
                </div>

                <div>
                  <span className="w-full inline-flex rounded-md shadow-sm">
                    <button type="button" onClick={() => this.login('discord')}
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out">
                      <i className="fab fa-discord text-xl"/>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-3 text-center">
          <Link to={"/"} className="text-purple-500 hover:text-purple-700">
            <i className="fad fa-long-arrow-alt-left mr-2"/> Go back
          </Link>
        </div>
      </div>
    )
  }
}