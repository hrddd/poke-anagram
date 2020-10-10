import * as React from "react";
import { SelectedLoadingModal } from '../../../redux/modules/loadingModal';

type Props = {
  shouldShow: SelectedLoadingModal['shouldShow'],
};

const Component: React.SFC<Props> = (props) => {
  const { shouldShow } = props;
  return (<>
    {shouldShow && (<div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,.5)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '30px',
        fontWeight: 'bold'
      }}
    >now Loading...</div>)}
  </>);
};

export const LoadingModalComponent = React.memo(Component);