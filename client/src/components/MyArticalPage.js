import React from "react";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {Card, Col, Container, Image, Modal, Row, Collapse} from "react-bootstrap";
import {MdShare} from "react-icons/all";
import MySectionTag from "./MySectionTag";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import MyCommentBox from "./MyCommentBox";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/all";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/all";
import "../css/my_artical_page.css"
import axios from "axios";
import {parseGuardian} from "../utilFunc";
import MyLoader from "./MyLoader";
import {withRouter} from 'react-router';

class MyArticalPage extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            open: false,
            source: '',
            newsInfo: {},
        }
    }

    callArticlePageAPI = (id) => {
        const url = "http://localhost:9000/guardianapi/detailed/" + decodeURIComponent(id);
        if (!this.state.loading) {
            this.setState({
                loading: true,
            });
        }
        axios.get(url)
            .then(resp => {
                console.log(url);
                console.log(resp.data.response);
                this.setState({
                    newsInfo: parseGuardian(resp.data.response.content),
                }, () => {
                    this.setState({
                        loading: false
                    })
                });
            })
    };

    componentDidMount() {
        this.callArticlePageAPI(this.props.match.params.id);
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    };

    showMore = () => {
        this.setState({open: true});
    };

    showLess = () => {
        this.setState({open: false});
    };

    render() {
        if (this.state.loading) {
            return (
                <MyLoader/>
            )
        }
        let descstr = this.state.newsInfo.desc;
        let start = 4;
        let delimiter = '.';
        let part1 = '';
        let part2 = '';
        if (descstr.split(delimiter).length <= start) {
            part1 = descstr;
        }
        else {
            let tokens = descstr.split(delimiter).slice(0, start);
            part1 = tokens.join(delimiter) + '.';
            tokens = descstr.split(delimiter).slice(start);
            part2 = tokens.join(delimiter);
        }
        return (
            <>
                <div className={"divArticalPage"}>
                <Card className={"cardArticalPage"}>
                    {/*<Card.Title>{this.state.newsInfo.title}</Card.Title>*/}
                    {/*<span align={"left"} style={{display: "inline", float: "left"}}>{this.props.newsInfo.date}</span>*/}
                    {/*<span align={"right"} style={{display: "inline", float: "left"}}>aaaaaaa</span>*/}
                    <h3 align={"left"}><Element name={"titleElem"}>{this.state.newsInfo.title}</Element></h3>
                    <Row>
                        <Col style={{textAlign: "left"}}>
                            {this.state.newsInfo.date}
                        </Col>
                        <Col style={{textAlign: "right"}}>
                            <div className={"articleShare"}>

                                <FacebookShareButton url={this.state.newsInfo.url}
                                                     hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={36}
                                                                                                 round={true}/></FacebookShareButton>
                                <TwitterShareButton url={this.state.newsInfo.url}
                                                    hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={36}
                                                                                                 round={true}/></TwitterShareButton>
                                <EmailShareButton url={this.state.newsInfo.url} subject={"#CSCI_571_NewsApp"}><EmailIcon
                                    size={36} round={true}/></EmailShareButton>
                            </div>
                        </Col>
                    </Row>
                    <Card.Img src={this.state.newsInfo.imgsrc}/>
                    <div align={"left"}>
                        {part1}
                    </div>
                    <Element name="collapseElem" />
                    <Collapse in={this.state.open}>
                        <div id="example-collapse-text" align={"left"}>
                            {part2}
                        </div>
                    </Collapse>
                    <div className={"articalArrow"}>
                    {this.state.open ?
                        <Link activeClass="active" to="titleElem" spy={true} smooth={true} duration={300} >
                            <IoIosArrowUp size={30} onClick={this.showLess}/>
                        </Link>
                        :
                        <Link activeClass="active" to="collapseElem" spy={true} smooth={true} duration={300} >
                            <IoIosArrowDown size={30} onClick={this.showMore}/>
                        </Link>

                    }
                    </div>
                </Card>
                </div>
                <MyCommentBox id={encodeURIComponent(this.state.newsInfo.newsid)}/>
            </>
        );
    }
}


export default withRouter(MyArticalPage);