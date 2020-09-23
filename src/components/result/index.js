import React from "react";

import { Result, Button } from "antd";
const Results = (props) => (
  <Result
    title="Your operation has been executed"
    extra={
      <Button type="primary" key="console">
        Go Console
      </Button>
    }
  />
);

export default Results;
