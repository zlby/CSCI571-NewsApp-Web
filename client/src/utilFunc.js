export function dealWithGuardian(res_list) {
    let component_list = [];
    for (let i = 0; i < res_list.length; i++) {
        const item = res_list[i];
        if (!item || !item.blocks || !item.blocks.main
            || !item.sectionId || !item.webTitle || !item.webPublicationDate || !item.blocks.body['0'].bodyTextSummary) {
            continue;
        }
        if (item.sectionId.length === 0 || item.sectionId.length > 10) {
            continue;
        }
        const newitem = parseGuardian(item);
        component_list.push(newitem);
    }
    return component_list;
}


export const parseGuardian = (item) => {
    let imgsrc = '';
    if (!item.blocks.main.elements || !item.blocks.main.elements[0] || !item.blocks.main.elements[0].assets
        || item.blocks.main.elements[0].assets.length <= 0
        || !item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length - 1].file)
        imgsrc = 'https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png';
    else
        imgsrc = item.blocks.main.elements[0].assets[item.blocks.main.elements[0].assets.length - 1].file;

    let newitem = {};
    newitem['imgsrc'] = imgsrc;
    newitem['title'] = item.webTitle;
    newitem['section'] = item.sectionId;
    newitem['date'] = item.webPublicationDate.substring(0, item.webPublicationDate.indexOf('T'));
    newitem['desc'] = item.blocks.body['0'].bodyTextSummary;
    newitem['url'] = item.webUrl;
    newitem['newsid'] = item.id;
    newitem['from'] = 'g';
    return newitem;
};


export function dealWithNYT(res_list) {
    let component_list = [];
    for (let i = 0; i < res_list.length; i++) {
        const item = res_list[i];
        let newitem = {};
        newitem['title'] = item.title;
        newitem['section'] = item.section;
        newitem['date'] = item['published_date'];
        newitem['desc'] = item.abstract;
        const multim = item.multimedia;
        let imgsrc = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg';
        if (multim && multim.length > 0) {
            for (let j = 0; j < multim.length; j++) {
                if (multim[j].width >= 2000) {
                    imgsrc = multim[j].url;
                    break;
                }
            }
        }
        newitem['imgsrc'] = imgsrc;
        newitem['url'] = item.url;
        newitem['newsid'] = item.url;
        newitem['from'] = 'n';
        component_list.push(newitem);
    }
    return component_list;
}
