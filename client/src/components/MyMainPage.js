import React from "react";

import MyNewsBar from "./MyNewsBar";
import MyLoader from "./MyLoader";
import MyNewsCard from "./MyNewsCard";

class MyMainPage extends React.Component{
    render() {

        switch (parseInt(this.props.renderType)) {
            case 0:
                if (!this.props.jsonData.results) {
                    return (
                        <MyLoader/>
                    )
                }
                const res_list = this.props.jsonData.results;
                if (!Array.isArray(res_list)) {
                    return (
                        <MyLoader/>
                    )
                }
                let component_list = dealWithGuardian(res_list);
                if (!Array.isArray(res_list)) {
                    return (
                        <MyLoader/>
                    )
                }
                component_list = component_list.map(item => <MyNewsBar newsInfo={item} />);
                return (
                    <div>
                        {component_list}
                    </div>
                );
            default:
                return (
                    <MyLoader/>
                );
            case 3:
                if (!this.props.jsonData.results) {
                    return (
                        <MyLoader/>
                    )
                }
                const res_list3 = this.props.jsonData.results;
                if (!Array.isArray(res_list3)) {
                    return (
                        <MyLoader/>
                    )
                }
                let component_list3 = dealWithGuardian(res_list3);
                component_list3 = component_list3.map(item => <MyNewsCard newsInfo={item} />);
                return (
                    <div>
                        {component_list3}
                    </div>
                )
                break;
        }
    }
}

function dealWithGuardian(res_list) {
    let component_list=[];
    for (let i = 0; i < res_list.length; i++) {
        const item = res_list[i];
        if (!item || !item.blocks || !item.blocks.main || !item.blocks.main.elements || !item.blocks.main.elements[0]) {
            continue;
        }
        const assests_list = item.blocks.main.elements[0].assets;
        if (assests_list && assests_list.length > 0) {
            if (assests_list[assests_list.length-1].file) {
                let newitem = {};
                newitem['imgsrc'] = assests_list[assests_list.length-1].file;
                newitem['title'] = item.webTitle;
                newitem['section'] = item.sectionId;
                newitem['date'] = item.webPublicationDate.substring(0, item.webPublicationDate.indexOf('T'));
                newitem['desc'] = item.blocks.body['0'].bodyTextSummary;
                component_list.push(newitem);
            }

        }
    }
    return component_list;
}

export default MyMainPage;