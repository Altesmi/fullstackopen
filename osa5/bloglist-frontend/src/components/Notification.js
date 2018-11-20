import React from "react";

const NotificationBox = props => {
  if (props.msg === null) {
    return null;
  }

  return <div className={props.classname}> {props.msg} </div>;
};

export default NotificationBox;