import React from "react";
import commentBox from 'commentbox.io';

class MyCommentBox extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        this.removeCommentBox = commentBox("5754892564037632-proj", {
            createBoxUrl(boxId, pageLocation) {
                pageLocation.search = ''; // removes query string!
                pageLocation.hash = boxId;
                return decodeURIComponent(pageLocation.href);
            },
        });
    }

    render() {
        return (
            <div className={"commentbox"} id={this.props.id}/>
        );
    }
}


export default MyCommentBox;