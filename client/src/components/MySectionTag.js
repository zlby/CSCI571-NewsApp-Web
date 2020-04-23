import React from "react";

function MySectionTag(props) {
    let mycolor;

    let sect = props.section;
    if (sect === undefined) {
        sect = 'none';
    }
    sect = sect.toLowerCase();
    if (sect === 'sport')
        sect = 'sports';
    switch (sect) {
        case 'world':
            mycolor = '#7c4eff';
            break;
        case 'politics':
            mycolor = '#419488';
            break;
        case 'business':
            mycolor = '#4696ec';
            break;
        case 'technology':
            mycolor = '#cedc39';
            break;
        case 'sports':
            mycolor = '#f6c244';
            break;
        case 'health':
            mycolor = '#6e757c';
            break;
        case 'guardian':
            mycolor = '#14284a';
            break;
        case 'nytimes':
            mycolor = '#dddddd';
            break;
        default:
            mycolor = '#6e757c';
            break;
    }
    return (

        <div style={{
            backgroundColor: mycolor,
            maxWidth: 'max-content',
            display: 'inline-block',
            height: '20px',
            marginLeft: '3px',
            // width: '-moz-fit-content',
            // whiteSpace: 'nowrap',
            // display: 'table',
            // height: '2px',
            borderRadius: '5px',
            textAlign: 'center',
            paddingLeft: '5px',
            paddingRight: '5px',
        }}>
            <p style={{fontWeight: 'bold', color: 'white', fontSize: '13px'}}>{sect.toUpperCase()} </p>
        </div>
    )
}

export default MySectionTag;