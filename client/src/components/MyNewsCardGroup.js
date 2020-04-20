import React from "react";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import "./../css/my_news_card.css"

import MyNewsCard from "./MyNewsCard";

function MyNewsCardGroup(props) {
    let news_list = props.newsList;
    news_list = news_list.map(item => {
        return (
            <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                <MyNewsCard newsInfo={item} isFavo={props.isFavo} fnUpdate={props.fnUpdate}/>
            </Col>
        )
    });
    return (
        <Container fluid={true} className={"myNewsCardGroup"}>
            <Row>
                {news_list}
            </Row>
        </Container>
    );
}

export default MyNewsCardGroup;