import React from "react";
import axios from "axios";
import MyLoader from "./MyLoader";
import {dealWithGuardian, dealWithNYT, parseGuardian} from "../utilFunc";
import MyNewsBar from "./MyNewsBar";
import { withRouter } from "react-router";

class MyHomePage extends React.Component{
    constructor() {
        super();
        this.state = {
            loading: true,
            jsonData: []
        }
    }

    callHomePageAPI = (section) => {
        if (section === 'all') {
            section = '';
        }
        let url = '';
        if (this.props.source === 'g') {
            url = "http://localhost:9000/guardianapi/" + section;
        }
        else {
            url = 'http://localhost:9000/nytimesapi/' + section;
        }
        if (!this.state.loading) {
            this.setState({
                loading: true,
            });
        }
        axios.get(url)
            .then(resp => {
                this.setState({
                    jsonData: resp.data.response ? resp.data.response : resp.data,
                }, () => {
                    this.setState({
                        loading: false
                    })
                });
            })
    };

    componentDidMount() {
        let section = this.props.match.params.section;
        this.callHomePageAPI(section);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let section = this.props.match.params.section;
        this.callHomePageAPI(section);
    }

    render() {
        if (this.state.loading) {
            return (<MyLoader/>);
        }
        if (!this.state.jsonData.results) {
            return (
                <MyLoader/>
            )
        }
        const res_list = this.state.jsonData.results;
        if (!Array.isArray(res_list)) {
            return (
                <MyLoader/>
            )
        }
        let component_list;
        if (this.props.source === 'g')
            component_list = dealWithGuardian(res_list);
        else
            component_list = dealWithNYT(res_list);
        if (!Array.isArray(res_list)) {
            return (
                <MyLoader/>
            )
        }
        component_list = component_list.map(item => <MyNewsBar newsInfo={item}/>);
        return (
            <div>
                {component_list}
            </div>
        );

    }
}

export default withRouter(MyHomePage);