import React from "react";
import { Route } from "react-router-dom";
import { getAccessToken } from "../utils/localStorageService";


// const PrivateRoute: React.FC<{
//   component: React.FC;
//   path: string;
//   exact: boolean;
// }> = (props) => {
//   const accessToken = getAccessToken();
//   return accessToken ? (
//     <Route path={props.path} component={props.component} exact={props.exact} />
//   ) : (
    
//   );
// };

// export default PrivateRoute;
