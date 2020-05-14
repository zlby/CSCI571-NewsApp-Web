import React from "react";
import {Col, Container, Nav, Navbar, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import Switch from 'react-switch';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
// import {withRouter} from "react-router";
import {Redirect} from "react-router-dom"
import "../css/my_navbar.css";
import {MdBookmark, MdBookmarkBorder} from "react-icons/all";
import {FacebookIcon, FacebookShareButton} from "react-share";

class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadOptions = this.loadOptions.bind(this);
        this.state = {
            inputValue: '',
            searched: false,
            checked: this.props.checked,
        };
    }


    handleChange() {
        localStorage.setItem("source", localStorage.getItem("source") === 'g' ? 'n' : 'g');
        this.props.fnSwitch();
    }

    loadOptions = inputValue =>
        new Promise(resolve => {
            clearTimeout(this.loadTimer);
            this.loadTimer = setTimeout(() => {
                resolve(this.callAutoSuggest(inputValue));
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
        if (input === '')
            return;
        const url = 'https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=' + input;
        const apiKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
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
        this.setState({inputValue: inputValue});
        return inputValue;
    };

    handleSearch(optionSelected) {
        const keyword = optionSelected.value;
        this.setState({inputValue: keyword, searched: true});
    }


    render() {
        let cur_url = this.props.url;
        let myredirect = <></>;

        if (this.state.searched) {
            this.setState({searched: false}, () => {

                }
            );
            myredirect = <Redirect to={'/search/' + this.state.inputValue} />
        }
        let mybookmark;
        if (cur_url === '/favorite') {
            mybookmark = <MdBookmark size={30} color='white' />
        }
        else {
            mybookmark = <MdBookmarkBorder size={30} color='white' />
        }

        let ishome = false;
        let isworld = false;
        let ispolitics = false;
        let isbusiness = false;
        let istech = false;
        let issport = false;
        let isartile = false;
        let issearch = false;
        let isfavorite = false;
        switch (cur_url) {
            case '/home/all':
                ishome = true;
                break;
            case '/home/world':
                isworld = true;
                break;
            case '/home/politics':
                ispolitics = true;
                break;
            case '/home/business':
                isbusiness = true;
                break;
            case '/home/technology':
                istech = true;
                break;
            case '/home/sports':
                issport = true;
                break;
            case '/favorite':
                isfavorite = true;
        }
        let searchkeyword = '';
        if (cur_url.split('/')[1] === 'article') {
            isartile = true;
        }
        if (cur_url.split('/')[1] === 'search') {
            searchkeyword = cur_url.split('/')[2];
            issearch = true;
        }
        else {
            issearch = false;
        }
        console.log(searchkeyword);
        // console.log(this.state.inputValue);
        return (
            <>
                {myredirect}
            <Navbar className={"myNavbarClass"} variant="dark" collapseOnSelect expand="lg">
                <div className={"mySearchBox"}>
                    {issearch ?
                        <AsyncSelect
                            // inputValue={{label: '', value: 0}}
                            // defaultValue={{label: "Enter keyword ..", value: 0}}
                            // defaultValue={searchkeyword}
                            defaultValue={searchkeyword}
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            onChange={this.handleSearch}
                            placeholder={"Enter keyword .."}
                        />
                        :
                        <AsyncSelect
                            // value={''}
                            defaultValue={searchkeyword}
                            cacheOptions
                            loadOptions={this.loadOptions}
                            defaultOptions
                            onInputChange={this.handleInputChange}
                            onChange={this.handleSearch}
                            placeholder={"Enter keyword .."}
                        />
                    }

                </div>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={"/home/all"} active={ishome} align={"left"}>Home</Nav.Link>
                        <Nav.Link href={"/home/world"} active={isworld} align={"left"}>World</Nav.Link>
                        <Nav.Link href={"/home/politics"} active={ispolitics} align={"left"}>Politics</Nav.Link>
                        <Nav.Link href={"/home/business"} active={isbusiness} align={"left"}>Business</Nav.Link>
                        <Nav.Link href={"/home/technology"} active={istech} align={"left"}>Technology</Nav.Link>
                        <Nav.Link href={"/home/sports"} active={issport} align={"left"}>Sports</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link href={"/favorite"} align={"left"}>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        Bookmark
                                    </Tooltip>
                                }
                            >
                                {mybookmark}
                            </OverlayTrigger>{' '}

                        </Nav.Link>

                        {
                            (isfavorite || issearch || isartile ) ?
                                <></>
                                :
                                <>
                                <Nav.Link disabled={true} style={{color: 'white'}} align={"left"}>NYTimes</Nav.Link>
                                <Nav.Link align={"left"}>
                            <Switch
                            onChange={this.handleChange}
                            checked={this.props.checked}
                            checkedIcon={false}
                            uncheckedIcon={false}
                            onColor={'#29f'}
                            />
                            </Nav.Link>
                            <Nav.Link align={"left"} disabled={true} style={{color: 'white'}}>Guardian</Nav.Link>
                                </>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
                </>
        )
    }
}


export default MyNavbar;
