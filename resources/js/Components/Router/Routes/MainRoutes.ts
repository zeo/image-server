import {Route} from "../index";
import Home from "../../../Pages/Home";
import ImageList from "../../../Pages/Images/ImageList";
import ImageView from "../../../Pages/Images/ImageView";
import Settings from "../../../Pages/Settings";

let routes: Route[] = [
    {
        paths: '/',
        component: Home
    },
    {
        paths: '/images',
        component: ImageList
    },
    {
        paths: '/images/:id',
        component: ImageView
    },
    {
        paths: '/settings',
        component: Settings
    }
];

export default routes;