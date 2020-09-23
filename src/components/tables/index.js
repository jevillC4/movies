import React from "react";
import PropTypes from "prop-types";

import { Table } from "antd";
import { v4 as uuidv4 } from "uuid";

const Turns = (props) => {
  const { data, columns } = props;
  const rowKey = (key) => uuidv4();

  return <Table rowKey={rowKey} columns={columns} dataSource={data} />;
};

Turns.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default Turns;
