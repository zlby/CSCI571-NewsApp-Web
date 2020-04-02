import React from "react";
import '../css/my_news_bar.css';
import {Card, Col, Container, Image, Row, Button} from 'react-bootstrap';

import MySectionTag from "./MySectionTag";


class MyNewsCard extends React.Component {

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.newsInfo.imgsrc} />
                <Card.Body>
                    <Card.Title>{this.props.newsInfo.title}</Card.Title>
                    <Card.Text>
                        {this.props.newsInfo.desc}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default MyNewsCard;