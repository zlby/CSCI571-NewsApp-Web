import React from "react";
import {Nav, Navbar} from 'react-bootstrap';
import Switch from 'react-switch';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        // this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            inputValue: '',
            type: ''
        };
    }

    // componentDidMount(props) {
    //     this.setState(() => {
    //         return {
    //             type: this.props.renderType
    //         }
    //     })
    // }

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
        this.props.fnSelect(url, this.props.renderType);
    }

    handleChange() {
        this.props.fnSwitch();
    }

    loadOptions = inputValue =>
        new Promise(resolve => {
            clearTimeout(this.loadTimer);
            this.loadTimer = setTimeout(() => {
                resolve(this.filterColors(inputValue));
            }, 1000);
        });


    filterColors = (inputValue) => {
        const options = [
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'},
            {value: 'blueberry', label: 'Blueberry'},
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
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <div style={{width: '15rem'}}>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            onChange={this.handleSearch}
                        />
                    </div>
                    <Nav.Link eventKey={1} onSelect={this.handleSelect}>Home</Nav.Link>
                    <Nav.Link eventKey={2} onSelect={this.handleSelect}>World</Nav.Link>
                    <Nav.Link eventKey={3} onSelect={this.handleSelect}>Politics</Nav.Link>
                    <Nav.Link eventKey={4} onSelect={this.handleSelect}>Business</Nav.Link>
                    <Nav.Link eventKey={5} onSelect={this.handleSelect}>Technology</Nav.Link>
                    <Nav.Link eventKey={6} onSelect={this.handleSelect}>Sports</Nav.Link>
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
            </Navbar>
        )
    }
}


export default MyNavbar;