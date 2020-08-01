import React, {Component} from "react";
import Page from "../Components/Layouts/Page";
import Auth from "../Services/API/Auth";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(): void {
  
  }
  
  render(): JSX.Element {
    return (
      <Page active={"home"}>
        <div className="py-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p
                className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">Transactions</p>
              <h3
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                A better way to send money
              </h3>
              <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
                Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum
                cupiditate veritatis in accusamus quisquam.
              </p>
            </div>
            
            <div className="mt-10">
              <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
                <li>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fad fa-globe" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium text-gray-900">Competitive
                        exchange rates</h4>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                        impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                        ratione.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10 md:mt-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fad fa-equals" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium text-gray-900">No hidden
                        fees</h4>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                        impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                        ratione.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10 md:mt-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div
                        className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fad fa-bolt" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium text-gray-900">Transfers are
                        instant</h4>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                        impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                        ratione.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-10 md:mt-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div
                        className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <i className="fad fa-pager" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg leading-6 font-medium text-gray-900">Mobile
                        notifications</h4>
                      <p className="mt-2 text-base leading-6 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
                        impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
                        ratione.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      
      </Page>
    );
  }
}