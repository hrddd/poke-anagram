import { useDispatch, useSelector } from "react-redux";
import { HogeComponent } from '../components/hogeComponent';
import { updateName, updateEmail, selectHoge } from "../redux/modules/hoge";
import { useCallback } from "react";
import React from "react";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const handleNameChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(updateName(value)),
    []
  );
  const handleEmailChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(updateEmail(value)),
    []
  );
  const { name, email } = useSelector(selectHoge);

  const props = {
    name,
    email,
    handleNameChange,
    handleEmailChange,
  };

  return (<HogeComponent {...props} />);
};

export default Component;
