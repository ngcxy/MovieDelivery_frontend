import React from "react";
import {Result, Button} from 'antd';
import {Link} from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                // extra={
                //     <Link to="/">
                //         <Button type="primary">Back BoLe</Button>
                //     </Link>
                // }
            />
        );
    }
}

export {NotFound};