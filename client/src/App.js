import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Switch, Route, Redirect} from 'react-router-dom';

import MyNavbar from "./components/MyNavbar";
import MyMainPage from "./components/MyMainPage";
import MyLoader from "./components/MyLoader";
import MySectionTag from "./components/MySectionTag";
import MyTestCompo from "./components/MyTestCompo";
import MyArticalPage from "./components/MyArticalPage";
import MyHomePage from "./components/MyHomePage";


class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            source: 'g',
            loading: true,
        };
        // this.changeStateSync = this.changeStateSync.bind(this);
        // this.callAPI = this.callAPI.bind(this);
        // this.changeSource = this.changeSource.bind(this);
        // this.searchPage = this.searchPage.bind(this);
        // this.showArticle = this.showArticle.bind(this);
    }

    // changeSource() {
    //     this.setState(prevState => {
    //         return {
    //             isGuardian: !prevState.isGuardian
    //         }
    //     })
    // }

    // searchPage(keyword) {
    //     const url = 'http://localhost:9000/guardianapi/search/' + keyword;
    //     this.callAPI(url, 3);
    // }



    // callAPI(url, t) {
    //     this.setState({
    //         loading: true,
    //         json_data: {}
    //     });
    //     axios.get(url)
    //         .then(resp => {
    //             this.setState({type: t, cur_req: url, json_data: resp.data.response, loading: false}, () => {
    //                     console.log(this.state.cur_req);
    //                 });
    //         })
    // }

    // showArticle(id, source) {
    //     if (source === 'g') {
    //         this.callAPI('http://localhost:9000/guardianapi/detailed/' + id, 2);
    //     }
    // }
    changeSource = () => {
        this.setState({loading: true});
        if (this.state.source === 'g') {
            this.setState({
                source: 'n'
            }, () => {
                this.setState({
                    loading: false
                })
            });
        }
        else {
            this.setState({
                source: 'y'
            }, () => {
                this.setState({
                    loading: false
                })
            });
        }
    };



    componentDidMount() {
        this.setState({loading: false});
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.state.json_data !== prevState.json_data) {
    //         this.forceUpdate();
    //     }
    // }

    render() {
        return (
            <div className="App">
                <MyNavbar fnSwitch={this.changeSource} checked={this.state.source === 'g'}/>
                {this.state.loading ?
                    <MyLoader/> :
                    <Switch>
                        <Route exact path={"/"}>
                            <Redirect to={"/home/all"}/>
                        </Route>
                        <Route path={"/home/:section"}>
                            <MyHomePage source={this.state.source}/>
                        </Route>
                        {/*<Route path={"/search/:keyword"}>*/}
                        {/*    <MySearchPage />*/}
                        {/*</Route>*/}
                        <Route path={"/article/:id"}>
                            <MyArticalPage />
                        </Route>
                        {/*<Route path={"/"}>*/}
                        {/*    <MyFavoritePage />*/}
                        {/*</Route>*/}
                    </Switch>
                }
            </div>
        );
    }
}

export default App;
