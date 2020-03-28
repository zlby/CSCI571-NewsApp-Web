import React from "react";
import {Navbar, Nav, Form, FormControl} from 'react-bootstrap';
import Switch from 'react-switch';

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelect(eventKey) {
        let category;
        switch (parseInt(eventKey)) {
            case 1:
                category = '/';
                break;
            case 2:
                category = '/world';
                break;
            case 3:
                category = '/politics';
                break;
            case 4:
                category = '/business';
                break;
            case 5:
                category = '/technology';
                break;
            case 6:
                category = '/sports';
                break;
            default:
                category = '/';
                break;
        }
        let url = "http://localhost:9000/guardianapi" + category;
        this.props.fnSelect(url);
    }

    handleChange() {
        this.props.fnSwitch();
    }

    render() {

        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    </Form>
                    <Nav.Link eventKey={1} onSelect={this.handleSelect}>Home</Nav.Link>
                    <Nav.Link eventKey={2} onSelect={this.handleSelect}>World</Nav.Link>
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>Politics</Nav.Link>
                    <Nav.Link eventKey={4} onSelect={this.handleSelect}>Business</Nav.Link>
                    <Nav.Link eventKey={5} onSelect={this.handleSelect}>Technology</Nav.Link>
                    <Nav.Link eventKey={6} onSelect={this.handleSelect}>Sports</Nav.Link>
                    <Nav.Link>NYTimes</Nav.Link>
                    <Nav.Link>
                        <Switch onChange={this.handleChange}
                                checked={this.props.checked}
                                checkedIcon={false}
                                uncheckedIcon={false}
                        />
                    </Nav.Link>
                    <Nav.Link>Guardian</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}


export default MyNavbar;