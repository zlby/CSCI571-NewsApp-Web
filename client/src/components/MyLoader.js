import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import {css} from "@emotion/core";

function MyLoader() {
    const override = css`display: block;margin: 0 auto;`;
    return (
        <div style={{position: "absolute", top: "50%", left: "50%"}}>
            <BounceLoader css={override} color={"#2d4eca"}/>
            <h4>Loading</h4>
        </div>
    )
}

export default MyLoader;