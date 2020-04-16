import React from "react";
import '../css/my_news_bar.css';
import {Card, Col, Container, Image, Modal, Row} from 'react-bootstrap';
import {MdShare} from "react-icons/all";


import MySectionTag from "./MySectionTag";
import {EmailShareButton, FacebookShareButton, TwitterShareButton} from "react-share";
import {EmailIcon, FacebookIcon, TwitterIcon} from "react-share";
import {withRouter, Redirect} from "react-router";
import PropTypes from 'prop-types';


class MyNewsBar extends React.Component {


    constructor() {
        super();
        this.state = {show: false};
    }


    handleShow = (event) => {
        event.stopPropagation();
        this.setState({show: true});
    };

    handleHide = () => {
        this.setState({show: false});
    };

    handleDetail = () => {
        this.props.fnDetail(this.props.newsInfo.newsid, this.props.newsInfo.from);
    };

    handleClick = () => {
        this.props.history.push('/article/' + encodeURIComponent(this.props.newsInfo.newsid));
    };





    render() {
        return (
            <>
                <Card className={"outerCardInNewsBar"} onClick={this.handleClick}>
                {/*<Card className={"outerCardInNewsBar"}>*/}
                    <Container fluid={true} className={"containerInNewsBar"}>
                        <Row>
                            <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                                <Image className={"imageInNewsBar"} src={this.props.newsInfo.imgsrc} rounded/>
                            </Col>
                            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                                <h3 align={"left"}>{this.props.newsInfo.title}<MdShare onClick={this.handleShow}/></h3>
                                <p className={"descInNewsBar"}>{this.props.newsInfo.desc}</p>
                                <div>
                                    <Row>
                                        <Col><p align={"left"}>{this.props.newsInfo.date}</p></Col>
                                        <Col>
                                            <div align={"right"}><MySectionTag section={this.props.newsInfo.section}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <h5>{this.props.newsInfo.title}</h5>
                    </Modal.Header>

                    <Modal.Body style={{justifyContent: "space-around"}}>
                        <h5 className={"modalShareVia"}>Share via</h5>
                        <div className={"modalDiv"}>

                            <FacebookShareButton url={this.props.newsInfo.url}
                                                 hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={48}
                                                                                             round={true}/></FacebookShareButton>
                            <TwitterShareButton url={this.props.newsInfo.url}
                                                hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={48}
                                                                                             round={true}/></TwitterShareButton>
                            <EmailShareButton url={this.props.newsInfo.url} subject={"#CSCI_571_NewsApp"}><EmailIcon
                                size={48} round={true}/></EmailShareButton>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default withRouter(MyNewsBar);