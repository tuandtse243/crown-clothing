import './button.styles.scss';
import { SpinnerContainer } from '../spinner/spinner.style';
import styled from 'styled-components';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
  margin-top: 9px;
`

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {isLoading ? <ButtonSpinner/> : children}
    </button>
  );
};

export default Button;

