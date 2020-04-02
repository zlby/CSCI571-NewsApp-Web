import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import MyNavbar from "./components/MyNavbar";
import MyMainPage from "./components/MyMainPage";
import MyLoader from "./components/MyLoader";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cur_req: '',
            isGuardian: true,
            loading: true,
            type: -1,
            json_data: {}
        };
        this.callAPI = this.callAPI.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.searchPage = this.searchPage.bind(this);
    }

    changeSource() {
        this.setState(prevState => {
            return {
                isGuardian: !prevState.isGuardian
            }
        })
    }

    searchPage(keyword) {
        if (this.state.isGuardian) {
            const url = 'http://localhost:9000/guardianapi/search/' + keyword;
            this.callAPI(url, 3);
        }
    }

    callAPI(url, t) {
        this.setState({
            loading: true,
        });
        axios.get(url)
            .then(resp =>
                this.setState((prevState) => {
                    return {
                        type: t,
                        cur_req: url,
                        json_data: resp.data.response,
                        loading: false,
                    }
                }));
    }


    componentDidMount() {
        this.callAPI('http://localhost:9000/guardianapi/', 0);
    }


    render() {
        return (
            <div className="App">
                <MyNavbar renderType={this.state.type} fnSwitch={this.changeSource} fnSelect={this.callAPI} fnSearch={this.searchPage} checked={this.state.isGuardian}/>
                {this.state.loading ?
                    <MyLoader/> :
                    <MyMainPage renderType = {this.state.type} jsonData={this.state.json_data} />
                }
            </div>
        );
    }
}

export default App;
