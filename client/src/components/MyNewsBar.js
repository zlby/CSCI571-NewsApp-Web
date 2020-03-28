import React from "react";
import '../css/my_news_bar.css';
import {Card, Col, Container, Image, Row} from 'react-bootstrap';

import MySectionTag from "./MySectionTag";


class MyNewsBar extends React.Component {

    render() {
        return (
            <Card className={"outerCardInNewsBar"}>
                <Container fluid={true} className={"containerInNewsBar"}>
                    <Row>
                        <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Image className={"imageInNewsBar"} src={this.props.newsInfo.imgsrc} rounded/>
                        </Col>
                        <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                            <h3 align={"left"}>{this.props.newsInfo.title}</h3>
                            <p className={"descInNewsBar"}>{this.props.newsInfo.desc}</p>
                            <div>
                                <Row>
                                    <Col><p align={"left"}>{this.props.newsInfo.date}</p></Col>
                                    <Col><div align={"right"}><MySectionTag section={this.props.newsInfo.section}/></div></Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card>

        );
    }
}

export default MyNewsBar;