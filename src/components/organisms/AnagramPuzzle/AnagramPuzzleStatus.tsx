import * as React from "react";
type Props = {
  existedQLength: number,
  nextQ: string,
};

const Component: React.SFC<Props> = (props) => {
  const { existedQLength, nextQ } = props;
  return (

    <div>
      <div>
        あと{existedQLength}問
      </div>
      <div style={{ marginTop: '16px' }}>
        next Q: {nextQ}
      </div>
    </div >
  );
};

export const AnagramPuzzleStatus = React.memo(Component);