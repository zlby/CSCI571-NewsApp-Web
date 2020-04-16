import React from "react";
import '../css/my_news_card.css';
import {Card, Container, Row, Col, Modal} from 'react-bootstrap';
import MySectionTag from "./MySectionTag";
import {MdShare} from "react-icons/all";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";


class MyNewsCard extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
        }
    }

    handleDetail = () => {
        this.props.fnDetail(this.props.newsInfo.newsid, this.props.newsInfo.from);
    };

    handleShow = (event) => {
        event.stopPropagation();
        this.setState({show: true});
    };

    handleHide = () => {
        this.setState({show: false});
    };

    render() {
        return (
            <>
                <Container className={"myNewsCardContainer"} onClick={this.handleDetail}>
                    <div className={"myNewsCardTitleDiv"}>
                        {this.props.newsInfo.title}<MdShare onClick={this.handleShow}/>
                    </div>
                    <Card className={"myNewsCard"}>
                        <Card.Img variant="top" src={this.props.newsInfo.imgsrc}/>
                        <Card.Body>
                            <Card.Text>
                                <div>
                                    <Row>
                                        <Col><p align={"left"}>{this.props.newsInfo.date}</p></Col>
                                        <Col>
                                            <div align={"right"}><MySectionTag section={this.props.newsInfo.section}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
                <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Header closeButton>
                        <div>
                            <h4>{this.props.newsInfo.from === 'g' ? "GUARDIAN" : "NYTIMES"}</h4>
                            <h5>{this.props.newsInfo.title}</h5>
                        </div>

                    </Modal.Header>

                    <Modal.Body style={{justifyContent: "space-around"}}>
                        <h5 className={"modalShareVia"}>Share via</h5>
                        <div className={"modalDiv"}>
                            <EmailShareButton url={this.props.newsInfo.url} subject={"#CSCI_571_NewsApp"}><EmailIcon
                                size={48} round={true}/></EmailShareButton>
                            <FacebookShareButton url={this.props.newsInfo.url}
                                                 hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={48}
                                                                                             round={true}/></FacebookShareButton>
                            <TwitterShareButton url={this.props.newsInfo.url}
                                                hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={48}
                                                                                             round={true}/></TwitterShareButton>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default MyNewsCard;