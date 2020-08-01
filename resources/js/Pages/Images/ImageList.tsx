import React, {Component} from "react";
import Page from "../../Components/Layouts/Page";
import ImageService, {Image, Images} from "../../Services/API/Image";
import {Link} from "react-router-dom";

export default class ImageList extends Component<null, { images?: Images }> {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  componentDidMount(): void {
    ImageService.getAll()
      .then((res) => {
        console.log(res.data);
        this.setState({
          images: res.data
        })
      })
  }
  
  renderImage = (image: Image, index: number): JSX.Element => {
    return (
      <Link to={"/images/" + image.id} key={index}>
        <img src={image.url} alt="Image"/>
      </Link>
    );
  };
  
  render(): JSX.Element {
    let {images} = this.state;
    
    return (
      <Page active={"images"}>
        <div className="grid grid-cols-5 gap-4">
          {images && images.data.map(this.renderImage)}
        </div>
      </Page>
    );
  }
}