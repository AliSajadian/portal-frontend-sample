import React from "react";
import { Link } from "react-router-dom";

import { Button } from "reactstrap";

const NoContent = (props) => (
    <div className="text-center" style={{width : "100%"}}>
        {/* <h1 className="display-1 font-weight-bold">404</h1> */}
        <p className="h1">{props.children}</p>
        <Link to="/">      
        </Link>
    </div>
);

export default NoContent;
