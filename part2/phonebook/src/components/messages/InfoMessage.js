import PopupMessage from "./PopupMessage";

import "./InfoMessage.css";

const InfoMessage = ({message}) => <PopupMessage message={message} type="info" />;

export default InfoMessage;