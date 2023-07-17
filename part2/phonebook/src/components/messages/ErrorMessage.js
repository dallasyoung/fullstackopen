import PopupMessage from "./PopupMessage";

import "./ErrorMessage.css";

const ErrorMessage = ({message}) => <PopupMessage message={message} type="error" />;

export default ErrorMessage;