import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { ThemeContext } from "../../api/Theme";
import '../assets/scss/FooterSelectMusic.scss';

function FooterSelectMusic() {
    const useStyle = useContext(ThemeContext);

    return (
        <div style={{backgroundColor:useStyle.subTheme}} className={"Footer_Select_Music"}>
            <Link to={"/home"}>
                Select a podcast to continue
            </Link>
        </div>
    );
}

export default FooterSelectMusic;