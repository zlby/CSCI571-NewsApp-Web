import React from "react";
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import Switch from 'react-switch';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import "../css/my_navbar.css";

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        this.state = {
            inputValue: '',
            checked: this.props.checked,
        };
    }


    handleChange() {
        this.props.fnSwitch();
    }

    loadOptions = inputValue =>
        new Promise(resolve => {
            clearTimeout(this.loadTimer);
            this.loadTimer = setTimeout(() => {
                resolve(this.filterResult(inputValue));
            }, 1000);
        });


    filterResult = (inputValue) => {
        const options = [
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'},
            {value: 'blueberry', label: 'Blueberry'},
            {value: 'trump', label: 'trump'},
            {value: 'health', label: 'health'}
        ];
        return options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    async callAutoSuggest(input) {
        const url = 'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=' + input;
        const apiKey = '6c8e9f153d324c68923f127a6c7e8824';
        try {
            const resp = await axios.get(url, {headers: {'Ocp-Apim-Subscription-Key': apiKey}});
            const resultsRaw = resp.data.suggestionGroups[0].searchSuggestions;
            return resultsRaw.map(result => ({value: result.displayText, label: result.displayText}));
        } catch (e) {
            console.log(e);
        }
    }

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    handleSearch(optionSelected) {
        const keyword = optionSelected.value;
        this.props.fnSearch(keyword, 3);
    }


    render() {
        return (
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <div style={{width: "400px"}}>
                    <AsyncSelect
                        defaultValue={{label: "Enter keyword ..", value: 0}}
                        cacheOptions
                        loadOptions={this.loadOptions}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                        onChange={this.handleSearch}
                    />
                </div>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={"/home/all"}>Home</Nav.Link>
                        <Nav.Link href={"/home/world"}>World</Nav.Link>
                        <Nav.Link href={"/home/politics"}>Politics</Nav.Link>
                        <Nav.Link href={"/home/business"}>Business</Nav.Link>
                        <Nav.Link href={"/home/technology"}>Technology</Nav.Link>
                        <Nav.Link href={"/home/sports"}>Sports</Nav.Link>
                        <Nav.Link>NYTimes</Nav.Link>
                        <Nav.Link>
                            <Switch
                                onChange={this.handleChange}
                                checked={this.props.checked}
                                checkedIcon={false}
                                uncheckedIcon={false}
                            />
                        </Nav.Link>
                        <Nav.Link>Guardian</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }
}


export default MyNavbar;