import { Action } from "typescript-fsa";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { HogeComponent } from "../components/hogeComponent";
import { updateName, updateEmail, selectHoge } from "../redux/modules/hoge";

export interface HogeHandlers {
  updateName: (v: string) => Action<string>;
  updateEmail: (v: string) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    updateName: (v: string) => dispatch(updateName(v)),
    updateEmail: (v: string) => dispatch(updateEmail(v)),
  };
}

export default connect(selectHoge, mapDispatchToProps)(HogeComponent);
