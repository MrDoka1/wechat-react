import React from 'react';
import styles from "./Profile.module.scss"
import NavBar from "../../../../components/NavBar/NavBar";
import {notAvatarSVG} from "../../../../SVGs";
import LoaderElement from "../../../../components/CurrentChat/LoadChat/LoaderElement";

const LoadProfile = (props) => {
    return (
        <div className="page">
            <NavBar />
            <div className={styles.wrapper}>
                <div className={[styles.avatar, styles.block].join(" ")}>
                    {notAvatarSVG(200)}
                </div>
                <LoaderElement />
            </div>
        </div>
    );
};

export default LoadProfile;