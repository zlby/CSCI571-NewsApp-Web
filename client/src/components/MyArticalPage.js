import React from "react";
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import {Card, Col, Container, Image, Modal, Row, Collapse, OverlayTrigger, Tooltip} from "react-bootstrap";
import {MdBookmark, MdBookmarkBorder} from "react-icons/all";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import MyCommentBox from "./MyCommentBox";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/all";
import "../css/my_artical_page.css"
import axios from "axios";
import {parseGuardian, parseNYTimes} from "../utilFunc";
import MyLoader from "./MyLoader";
import {withRouter} from 'react-router';

class MyArticalPage extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            open: false,
            source: '',
            bookmarked: false,
            newsInfo: {},
        }
    }

    callArticlePageAPI = (id) => {
        let url = "http://54.86.70.47:9000/guardianapi/detailed/" + decodeURIComponent(id);
        if (id.indexOf('http') === 0) {
            url = "http://54.86.70.47:9000/nytimesapi/detailed/" + decodeURIComponent(id);
        }
        if (!this.state.loading) {
            this.setState({
                loading: true,
            });
        }
        axios.get(url)
            .then(resp => {
                this.setState({
                    newsInfo: id.indexOf('http') === 0 ? parseNYTimes(resp.data.response.docs['0']) :
                        parseGuardian(resp.data.response.content),
                }, () => {
                    this.setState({
                        loading: false
                    })
                });
            })
    };

    componentDidMount() {
        const myFavo = JSON.parse(localStorage.getItem("favo"));
        if (myFavo.hasOwnProperty(this.props.match.params.id)) {
            this.setState({
                bookmarked: true,
            }, () => {
                this.callArticlePageAPI(this.props.match.params.id);
            });
        }
        else {
            this.callArticlePageAPI(this.props.match.params.id);
        }
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

    markArticle = () => {
        let myFavo = JSON.parse(localStorage.getItem("favo"));
        myFavo[this.props.match.params.id] = this.state.newsInfo;
        localStorage.setItem("favo", JSON.stringify(myFavo));
        this.setState({bookmarked: true}, () => {
            // console.log(this.state.bookmarked);
            let content = 'Saving ' + this.state.newsInfo.title;
            toast(content, {
                className: 'myToastify',
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    unmarkArticle = () => {
        let myFavo = JSON.parse(localStorage.getItem("favo"));
        delete myFavo[this.props.match.params.id];
        localStorage.setItem("favo", JSON.stringify(myFavo));
        this.setState({bookmarked: false}, () => {
            // console.log(this.state.bookmarked);
            let content = 'Removing ' + this.state.newsInfo.title;
            toast(content, {
                className: 'myToastify',
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    render() {
        if (this.state.loading) {
            return (
                <MyLoader/>
            )
        }
        let mybookmark;
        if (this.state.bookmarked) {
            mybookmark = <MdBookmark size={34} color='red' onClick={this.unmarkArticle} style={{cursor: "pointer"}} />
        }
        else {
            mybookmark = <MdBookmarkBorder size={34} color='red' onClick={this.markArticle} style={{cursor: "pointer"}} />
        }
        let descstr = this.state.newsInfo.desc;
        let start = 4;
        let delimiter = '.';
        let part1 = '';
        let part2 = '';
        if (descstr.split(delimiter).length <= start) {
            part1 = descstr;
        } else {
            let tokens = descstr.split(delimiter).slice(0, start);
            part1 = tokens.join(delimiter) + '.';
            tokens = descstr.split(delimiter).slice(start);
            part2 = tokens.join(delimiter);
        }
        return (
            <>
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

                <div className={"divArticalPage"}>
                    <Card className={"cardArticalPage"}>
                        <h3 align={"left"}><Element name={"titleElem"}>{this.state.newsInfo.title}</Element></h3>
                        <Row>
                            <Col style={{paddingBottom: "1px"}} xs={5} sm={5} md={5} lg={7} xl={7}>
                                <div className={"articleDate"}>
                                    {this.state.newsInfo.date}
                                </div>
                            </Col>
                            <Col style={{textAlign: "right"}} xs={5} sm={5} md={5} lg={4} xl={4}>
                                <div className={"articleShare"}>

                                    <OverlayTrigger
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Facebook
                                            </Tooltip>
                                        }
                                    >
                                        <FacebookShareButton url={this.state.newsInfo.url}
                                                             hashtag={"#CSCI_571_NewsApp"}><FacebookIcon size={28}
                                                                                                         round={true}/></FacebookShareButton>
                                    </OverlayTrigger>{' '}

                                    <OverlayTrigger
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Twitter
                                            </Tooltip>
                                        }
                                    >
                                        <TwitterShareButton url={this.state.newsInfo.url}
                                                            hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={28}
                                                                                                         round={true}/></TwitterShareButton>
                                    </OverlayTrigger>{' '}

                                    <OverlayTrigger
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Email
                                            </Tooltip>
                                        }
                                    >
                                        <EmailShareButton url={this.state.newsInfo.url}
                                                          subject={"#CSCI_571_NewsApp"}><EmailIcon
                                            size={28} round={true}/></EmailShareButton>
                                    </OverlayTrigger>{' '}
                                </div>
                            </Col>
                            <Col style={{textAlign: "right"}} xs={1} sm={1} md={1} lg={1} xl={1}>
                                <div>
                                    <OverlayTrigger
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Bookmark
                                            </Tooltip>
                                        }
                                    >
                                        {mybookmark}
                                    </OverlayTrigger>{' '}


                                </div>

                            </Col>
                        </Row>
                        <Card.Img src={this.state.newsInfo.imgsrc}/>
                        <div align={"left"}>
                            {part1}
                        </div>
                        <Element name="collapseElem"/>
                        <Collapse in={this.state.open}>
                            <div id="example-collapse-text" align={"left"}>
                                {part2}
                            </div>
                        </Collapse>
                        <div className={"articalArrow"}>
                            {this.state.open ?
                                <Link activeClass="active" to="titleElem" spy={true} smooth={true} duration={300}>
                                    <IoIosArrowUp size={30} onClick={this.showLess}/>
                                </Link>
                                :
                                <Link activeClass="active" to="collapseElem" spy={true} smooth={true} duration={300}>
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