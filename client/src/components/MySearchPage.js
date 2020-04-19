import React from "react";
import axios from "axios";
import {dealWithGuardian, dealWithNYTimesSearch, parseGuardian, parseNYTimes} from "../utilFunc";
import MyLoader from "./MyLoader";
import MyNewsCardGroup from "./MyNewsCardGroup";

class MySearchPage extends React.Component{
    constructor() {
        super();
        this.state = {
            loading1: true,
            loading2: true,
            jsonDataGuardian: {},
            jsonDataNYTimes: {}
        }
    }

    componentDidMount() {
        this.searchTwoSource(this.props.match.params.keyword);
    }

    searchTwoSource(keyword) {
        this.callGuardianSearch(keyword);
        this.callNYTimesSearch(keyword);
    }

    callGuardianSearch = (keyword) => {
        const url = "http://localhost:9000/guardianapi/search/" + keyword;
        if (!this.state.loading1) {
            this.setState({
                loading1: true,
            });
        }
        axios.get(url)
            .then(resp => {
                this.setState({
                    jsonDataGuardian: resp.data.response,
                }, () => {
                    this.setState({
                        loading1: false
                    });
                });
            })
    };

    callNYTimesSearch = (keyword) => {
        const url = "http://localhost:9000/nytimesapi/search/" + keyword;
        if (!this.state.loading2) {
            this.setState({
                loading2: true,
            });
        }
        axios.get(url)
            .then(resp => {
                this.setState({
                    jsonDataNYTimes: resp.data.response,
                }, () => {
                    this.setState({
                        loading2: false
                    });
                });
            })
    };

    render() {
        if (this.state.loading1 || this.state.loading2) {
            return (
                <MyLoader/>
            )
        }
        let res_list = this.state.jsonDataGuardian.results;
        if (!Array.isArray(res_list)) {
            return (
                <MyLoader/>
            )
        }
        let component_list = dealWithGuardian(res_list);
        let news_group_list = [];
        let news_in_group = [];
        for (let ind = 0; ind < component_list.length; ind++) {
            news_in_group.push(component_list[ind]);
            if (news_in_group.length === 4) {
                news_group_list.push(news_in_group);
                news_in_group = [];
            }
        }
        news_group_list = news_group_list.map(item => <MyNewsCardGroup newsList={item}/>);
        let news_group_list2 = [];
        news_in_group = [];
        let docs_obj = this.state.jsonDataNYTimes.docs;
        component_list = dealWithNYTimesSearch(docs_obj);
        for (let ind = 0; ind < component_list.length; ind++) {
            news_in_group.push(component_list[ind]);
            if (ind === component_list.length - 1 || news_in_group.length === 4) {
                news_group_list2.push(news_in_group);
                news_in_group = [];
            }
        }
        news_group_list2 = news_group_list2.map(item => <MyNewsCardGroup newsList={item}/>);

        return (
            <div>
                <div>
                    <h2 align={"left"}>Results</h2>
                </div>
                {news_group_list}
                {news_group_list2}
            </div>
        );
    }
}


export default MySearchPage;