import React from "react";
import {Modal} from "react-bootstrap";
import {EmailIcon, FacebookIcon, TwitterIcon} from "react-share";


function MyShareModal(props) {
    return (
        <Modal show={props.showState} onHide={props.fnHide}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{props.newsInfo.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Share via</h4>
                    <div style={{justifyContent: "around"}}>
                        <EmailIcon url={props.newsInfo.url}/>
                        <FacebookIcon url={props.newsInfo.url}/>
                        <TwitterIcon url={props.newsInfo.url}/>
                    </div>
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    )
}

export default MyShareModal;