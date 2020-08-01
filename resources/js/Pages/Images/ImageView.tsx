import React, {Component, Fragment, createRef} from "react";
import Page from "../../Components/Layouts/Page";
import ImageService, {Image} from "../../Services/API/Image";
import NotFound from "../Errors/NotFound";
import {Redirect} from "react-router-dom";
import Modal from "../../Components/Partials/Modal";
import {Helmet} from "react-helmet";
import AuthService from "../../Services/AuthService";

interface ViewProps {
  match: {
    params: {
      id: string;
    }
  }
}

interface ViewState {
  image?: Image;
  error?: boolean;
  redirect?: string;
}

export default class ImageView extends Component<ViewProps, ViewState> {
  private id: number;
  private deleteModal = createRef<Modal>();
  
  constructor(props) {
    super(props);
    
    this.state = {};
    this.id = parseInt(this.props.match.params.id);
  }
  
  componentDidMount(): void {
    ImageService.getOne(this.id)
      .then(({data}) => {
        console.log(data);
        this.setState({
          image: data
        })
      }).catch(e => {
      this.setState({
        error: true
      });
    });
  }
  
  deleteImage = () => {
    this.deleteModal.current.toggle();
    
    ImageService.deleteOne(this.id)
      .then(() => {
        this.setState({
          redirect: '/images'
        });
      })
  };
  
  renderImageInfo = () => {
    let {image} = this.state;
    
    return (
      <Fragment>
        <div className="bg-white py-8">
          <div className="lg:flex lg:items-center lg:justify-between container">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                {image.name}
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                  <i className="fad fa-file-archive mr-2"/>
                  {image.size}
                </div>
                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
                  <i className="fad fa-user mr-2"/>
                  {image.user.name}
                </div>
                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                  <i className="fad fa-calendar mr-2"/>
                  {image.created_at}
                </div>
              </div>
            </div>
            
            {(AuthService.loggedIn && image.user.id === AuthService.user.id) && (
              <div className="mt-5 lg:mt-0 lg:ml-4">
                <span className="sm:ml-3 shadow-sm rounded-md">
                  <button type="button" onClick={() => this.deleteModal.current.toggle()}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-700 active:bg-red-700 transition duration-150 ease-in-out">
                    <i className="fad fa-trash mr-2"/>
                    Delete
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div className="container my-5 flex justify-center">
          <img src={image.url} alt="Image" className="shadow-xl"/>
        </div>
        
        <Modal ref={this.deleteModal}>
          <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"/>
            </div>
            
            <div
              className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    
                    <i className="fad fa-exclamation-triangle text-red-600"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Delete image?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        Are you sure you want to delete this image?
                        The image (and links to the image) will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button type="button" onClick={() => this.deleteImage()}
                          className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    Delete
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button type="button" onClick={() => this.deleteModal.current.toggle()}
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  };
  
  render(): JSX.Element {
    let {image} = this.state;
    
    if (this.state.error || !image) {
      return (<NotFound/>);
    }
    
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}/>
    }
    
    return (
      <Page active={""} noContainer={true}>
        <Helmet>
          <title>{image.name}</title>
          
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
          
          <meta property="og:type" content="video.other"/>
          <meta property="og:url" content={image.url} />
          <meta property="og:site_name" content="Zeo Image Server"/>
          <meta property="og:title" content={image.name} />
          <meta property="og:image" content={image.url} />

          <link rel="image_src" href={image.url} />
          <meta name="theme-color" content="#FF006B"/>
        </Helmet>
        
        {image && this.renderImageInfo()}
      </Page>
    );
  }
}