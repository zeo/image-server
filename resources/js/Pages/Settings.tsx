import React, {Component} from "react";
import Page from "../Components/Layouts/Page";
import AuthService, {User} from "../Services/AuthService";
import Http from "../Services/API/Base/Http";
import {Redirect} from "react-router-dom";

interface NewTokenRequest {
  upload_token: string;
}

interface SettingsState {
  user?: User;
  redirect?: true;
}

export default class Settings extends Component<null, SettingsState> {
  constructor(props) {
    super(props);
  
    if (!AuthService.loggedIn) {
      this.state = {
        redirect: true
      };
    } else {
      let user = AuthService.user;
      this.state = {user};
    }
  }
  
  componentDidMount() {
    AuthService.on('logout', this.onLogout);
  }
  
  componentWillUnmount() {
    AuthService.removeListener('logout', this.onLogout);
  }
  
  onLogout = () => {
    this.setState({
      redirect: true
    });
  };
  
  generateToken = () => {
    Http.post<NewTokenRequest>('/settings/new-token')
      .then(res => {
        if (!res) return;
        
        let upload_token = res.data.upload_token;
        this.setState({
          user: {
            ...this.state.user,
            upload_token
          }
        })
      });
  };
  
  render(): JSX.Element {
    if (this.state.redirect) {
      return <Redirect to={"/"} />
    }
    
    let {user} = this.state;
    
    return (
      <Page active="settings">
        <div>
          <div className="pt-3">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                You are not able to change this information
              </p>
            </div>
            <div className="mt-6 sm:mt-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="user_id"
                       className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                  User ID
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                    <input id="user_id" value={user.id} disabled
                           className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                  </div>
                </div>
              </div>
  
              <div
                className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name"
                       className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                  Name
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                    <input id="name" type="email" value={user.name} disabled
                           className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                  </div>
                </div>
              </div>
        
              <div
                className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email"
                       className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                  Email address
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                    <input id="email" type="email" value={user.email} disabled
                           className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                  </div>
                </div>
              </div>
        
              <div
                className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="upload_token" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                  Upload token
                </label>
                
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg rounded-md shadow-sm">
                    <input id="upload_token" type="text" value={user.upload_token} disabled
                           className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                  </div>
                  <span className="rounded-md shadow-sm">
                    <button type="button" onClick={this.generateToken}
                            className="inline-flex items-center px-3 mt-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
                      Regenerate
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                We'll always let you know about important changes, but you pick what else you want to hear about.
              </p>
            </div>
            <div className="mt-6 sm:mt-5">
              <div className="sm:border-t sm:border-gray-200 sm:pt-5">
                <div role="group" aria-labelledby="label-email">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                    <div>
                      <div
                        className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                        id="label-email">
                        By Email
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input id="comments" type="checkbox"
                                   className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                          </div>
                          <div className="ml-3 text-sm leading-5">
                            <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input id="candidates" type="checkbox"
                                     className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                            </div>
                            <div className="ml-3 text-sm leading-5">
                              <label htmlFor="candidates" className="font-medium text-gray-700">Candidates</label>
                              <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="relative flex items-start">
                            <div className="flex items-center h-5">
                              <input id="offers" type="checkbox"
                                     className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                            </div>
                            <div className="ml-3 text-sm leading-5">
                              <label htmlFor="offers" className="font-medium text-gray-700">Offers</label>
                              <p className="text-gray-500">Get notified when a candidate accepts or rejects an
                                offer.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-5 sm:border-t sm:border-gray-200 sm:pt-5">
                <div role="group" aria-labelledby="label-notifications">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                    <div>
                      <div
                        className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                        id="label-notifications">
                        Push Notifications
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="max-w-lg">
                        <p className="text-sm leading-5 text-gray-500">These are delivered via SMS to your mobile
                          phone.</p>
                        <div className="mt-4">
                          <div className="flex items-center">
                            <input id="push_everything" name="form-input push_notifications" type="radio"
                                   className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                              <label htmlFor="push_everything" className="ml-3">
                                <span className="block text-sm leading-5 font-medium text-gray-700">Everything</span>
                              </label>
                          </div>
                          <div className="mt-4 flex items-center">
                            <input id="push_email" name="form-input push_notifications" type="radio"
                                   className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                              <label htmlFor="push_email" className="ml-3">
                                <span
                                  className="block text-sm leading-5 font-medium text-gray-700">Same as email</span>
                              </label>
                          </div>
                          <div className="mt-4 flex items-center">
                            <input id="push_nothing" name="form-input push_notifications" type="radio"
                                   className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                              <label htmlFor="push_nothing" className="ml-3">
                                <span className="block text-sm leading-5 font-medium text-gray-700">No push notifications</span>
                              </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-5">
          <div className="flex justify-end">
            <span className="inline-flex rounded-md shadow-sm">
              <button type="button"
                      className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                Cancel
              </button>
            </span>
            <span className="ml-3 inline-flex rounded-md shadow-sm">
              <button type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                Save
              </button>
            </span>
          </div>
        </div>
      </Page>
    );
  }
}