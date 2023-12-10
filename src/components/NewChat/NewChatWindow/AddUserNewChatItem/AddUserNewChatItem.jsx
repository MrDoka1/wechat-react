import React from 'react';
import styles from "./AddUserNewChatItem.module.scss"
import EmptyUserItem from "../../../EmptyUserItem/EmptyUserItem";

const AddUserNewChatItem = ({user, selectUsers, updateSelectedUsers}) => {
    if (selectUsers.has(user.id)) {
        return (
            <div className={styles.wrapper}>
                <EmptyUserItem classNames={styles.emptyUser} user={user} disableNameLink={true}
                               onclick={()=>updateSelectedUsers(user.id)}>
                    <div className={styles.wrapperCircle}>
                        <div className={styles.circle}></div>
                    </div>
                </EmptyUserItem>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <EmptyUserItem classNames={styles.emptyUser} user={user} disableNameLink={true}
                           onclick={()=>updateSelectedUsers(user.id)} />
        </div>
    );
};

export default AddUserNewChatItem;