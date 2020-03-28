import React from "react";

import MyNewsBar from "./MyNewsBar";
import MyLoader from "./MyLoader";

class MyMainPage extends React.Component{
    render() {

        switch (parseInt(this.props.renderType)) {
            case 0:
                const res_list = this.props.jsonData.results;
                let component_list=[];
                if (!Array.isArray(res_list)) {
                    return (
                        <MyLoader/>
                    )
                }
                for (let i = 0; i < res_list.length; i++) {
                    const item = res_list[i];
                    const assests_list = item.blocks.main.elements[0].assets;
                    if (assests_list && assests_list.length > 0) {
                        if (assests_list[assests_list.length-1].file) {
                            let newitem = {};
                            newitem['imgsrc'] = assests_list[assests_list.length-1].file;
                            newitem['title'] = item.webTitle;
                            newitem['section'] = item.sectionId;
                            newitem['date'] = item.webPublicationDate;
                            newitem['desc'] = item.blocks.body['0'].bodyTextSummary;
                            component_list.push(newitem);
                        }

                    }
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
                )
        }
    }
}

export default MyMainPage;