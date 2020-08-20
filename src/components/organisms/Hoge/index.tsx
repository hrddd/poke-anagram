import { useDispatch, useSelector } from "react-redux";
import { HogeComponent } from './Hoge';
import { updateName, updateEmail, selectHoge } from "../../../redux/modules/hoge";
import { useCallback } from "react";
import React from "react";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const handleNameChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(updateName(value)),
    [dispatch]
  );
  const handleEmailChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(updateEmail(value)),
    [dispatch]
  );
  const { name, email } = useSelector(selectHoge);

  return (<HogeComponent
    name={name}
    email={email}
    handleNameChange={handleNameChange}
    handleEmailChange={handleEmailChange}
  />);
};

export default Component;
