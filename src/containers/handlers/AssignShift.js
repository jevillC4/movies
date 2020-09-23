import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";

const AssignShift = ({ turns, record, children, assignTurn }) => {
  const [sanitizeTurns, setSanitizeTurns] = useState([]);

  const validate = (o) => {
    const filtered = o.filter((i) => i.status === true);
    setSanitizeTurns([...filtered]);
  };

  const onHandlerSetTurn = (e) => {
    const obj = _.assign({}, record, { turn: e.key });
    assignTurn(obj);
  };

  useEffect(() => {
    validate(turns);
  }, [turns]);

  const menu = () =>
    sanitizeTurns.length > 0 ? (
      <Menu>
        {sanitizeTurns.map((v) => {
          return (
            <Menu.Item
              key={v.turn}
              prop={v.turn}
              onClick={onHandlerSetTurn}
            >{`Turno: ${v.turn}`}</Menu.Item>
          );
        })}
      </Menu>
    ) : (
      <Menu>
        <Menu.Item>...</Menu.Item>
      </Menu>
    );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      {children}
    </Dropdown>
  );
};

AssignShift.propTypes = {
  turns: PropTypes.array,
  record: PropTypes.object.isRequired,
  children: PropTypes.element,
  assignTurn: PropTypes.func.isRequired,
};

export default AssignShift;
