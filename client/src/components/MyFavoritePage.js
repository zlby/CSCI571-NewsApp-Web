import React from "react";
import {dealWithGuardian} from "../utilFunc";
import MyNewsCardGroup from "./MyNewsCardGroup";

class MyFavoritePage extends React.Component{
    constructor() {
        super();
    }

    fnUpdate = () => {
        this.forceUpdate();
    };

    render() {
        let component_list = JSON.parse(localStorage.getItem('favo'));
        let news_group_list = [];
        let news_in_group = [];
        let counter = 0;
        for (let ind in component_list) {
            news_in_group.push(component_list[ind]);
            counter++;
            if (counter === Object.keys(component_list).length || news_in_group.length === 4) {
                news_group_list.push(news_in_group);
                news_in_group = [];
            }
        }
        news_group_list = news_group_list.map(item => <MyNewsCardGroup newsList={item} isFavo={true} fnUpdate={this.fnUpdate}/>);
        if (news_group_list.length === 0) {
            return (
                <>
                    <h2>You have no saved articles</h2>
                </>
            )
        }
        return (
          <>
              <div>
                  <h2 align={"left"} style={{paddingLeft: '1rem'}}>Favorites</h2>
                  {news_group_list}
              </div>
          </>
        );
    }
}

export default MyFavoritePage;