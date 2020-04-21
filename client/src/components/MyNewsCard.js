import React from "react";
import '../css/my_news_card.css';
import {Card, Container, Row, Col, Modal} from 'react-bootstrap';
import MySectionTag from "./MySectionTag";
import {MdShare, MdDelete} from "react-icons/all";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import {Redirect} from "react-router-dom";
import {toast, ToastContainer, Zoom} from "react-toastify";


class MyNewsCard extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            redirect: false,
        }
    }

    handleDetail = () => {
        this.setState({redirect: true});
    };

    handleShow = (event) => {
        event.stopPropagation();
        this.setState({show: true});
    };

    removeFromFavo = (event) => {
        event.stopPropagation();
        let myFavo = JSON.parse(localStorage.getItem('favo'));
        delete myFavo[encodeURIComponent(this.props.newsInfo.newsid)];
        localStorage.setItem('favo', JSON.stringify(myFavo));
        let content = 'Removing ' + this.props.newsInfo.title;
        toast(content, {
            className: 'myToastify',
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        this.props.fnUpdate();
    };

    handleHide = () => {
        this.setState({show: false});
    };

    render() {
        let myredirect = <></>;
        if (this.state.redirect) {
            this.setState({redirect: false}, () => {

                }
            );
            myredirect = <Redirect to={'/article/' + encodeURIComponent(this.props.newsInfo.newsid)} />
        }
        let deletecompo = <></>;
        let sourcetag = <></>;
        if (this.props.isFavo) {
            deletecompo = <MdDelete onClick={this.removeFromFavo}/>;
            sourcetag = <MySectionTag section={this.props.newsInfo.from === 'g' ? 'guardian' : 'nytimes'}/>
        }
        return (
            <>
                {myredirect}
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    transition={Zoom}
                />
                <Container className={"myNewsCardContainer"} onClick={this.handleDetail}>

                    <Card className={"myNewsCard"}>
                        <Card.Title>
                            <div className={"myNewsCardTitleDiv"}>
                                {this.props.newsInfo.title}<MdShare onClick={this.handleShow}/>{deletecompo}
                            </div>
                        </Card.Title>
                        <Card.Img className={"imgInNewsCard"} variant="top" src={this.props.newsInfo.imgsrc}/>
                        <Card.Body style={{paddingLeft: "0px", paddingRight: "0px"}}>
                            <Card.Text>
                                <div>
                                    <Row>
                                        <Col><p align={"left"} style={{fontStyle: 'italic'}}>{this.props.newsInfo.date}</p></Col>
                                        <Col>
                                            <div align={"right"}>
                                                <MySectionTag section={this.props.newsInfo.section}/>
                                                {sourcetag}
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

export default MyNewsCard;