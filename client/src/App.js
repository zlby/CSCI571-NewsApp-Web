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
    }

    changeSource() {
        this.setState(prevState => {
            return {
                isGuardian: !prevState.isGuardian
            }
        })
    }

    callAPI(url) {
        // alert(url);
        this.setState({
            loading: true,
        });
        axios.get(url)
            .then(resp =>
                this.setState((prevState) => {
                    return {
                        type: 0,
                        cur_req: url,
                        json_data: resp.data.response,
                        loading: false,
                    }
                }));
        // console.log(this.state.json_data);
    }


    componentDidMount() {
        this.callAPI('http://localhost:9000/guardianapi/');
    }


    render() {
        return (
            <div className="App">
                <MyNavbar fnSwitch={this.changeSource} fnSelect={this.callAPI} checked={this.state.isGuardian}/>
                {this.state.loading ?
                    <MyLoader/> :
                    <MyMainPage renderType = {this.state.type} jsonData={this.state.json_data} />
                }
            </div>
        );
    }
}

export default App;
