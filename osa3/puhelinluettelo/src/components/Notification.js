import React from "react";

const NotificationBox = props => {
  if (props.msg === null) {
    return null;
  }

  return <div className="addedNotification"> {props.msg} </div>;
};

export default NotificationBox;
