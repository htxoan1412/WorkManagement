import React from "react";
import { getAccessToken } from "../utils/localStorageService";
import {Route} from "react-router-dom";

// const PublicRoute: React.FC<{
//     component: React.FC;
//     path: string;
//     exact: boolean;
// }> = (props) => {
//     const accessToken = getAccessToken();
//     return !accessToken ? (
//         <Route path= { props.path } component = { props.component } exact = { props.exact } />) : (
//     <Redirect to= "/home" />
//     );
//   };

// export default PublicRoute;
