import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useEffect } from "react";
import { LockFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import { Col, Row, Tag, Card, Button, Typography } from "antd";

import ShiftTable from "../../components/tables";
import ModalSelector from "../../redux-selectors/modals";
import TurnsSelector from "../../redux-selectors/turns";

import { showNewTurn } from "../../redux-actions/modals";
import {
  deleteTurn,
  getAllTurns,
  setObjectEditTurn,
} from "../../redux-actions/turns";

const { Title } = Typography;

const Turn = (props) => {
  const {
    turns,
    deleteTurn,
    modal_turn,
    getAllTurns,
    showNewTurn,
    setObjectEditTurn,
  } = props;
  const handlerNewTurn = (e) => {
    showNewTurn(!modal_turn);
  };

  const onEdit = (e) => {
    setObjectEditTurn(e);
    showNewTurn(!modal_turn);
  };

  const onDelete = (e) => deleteTurn(e.id);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 200,
    },
    {
      title: "Turno",
      dataIndex: "turn",
      key: "turn",
      width: 200,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (text, record, index) => {
        let obj = {
          [true]: "Activo",
          [false]: "Inactivo",
        };
        return obj[text];
      },
    },
    {
      title: "",
      key: "actions",
      dataIndex: "actions",
      width: 200,
      render: (text, record, index) => {
        return (
          <div>
            <Tag color="green" key="1" onClick={() => onEdit(record)}>
              <EditFilled style={{ fontSize: "1.1rem" }} />
            </Tag>
            <Tag color="geekblue" key="2">
              <LockFilled style={{ fontSize: "1.1rem" }} />
            </Tag>
            <Tag color="volcano" key="3" onClick={() => onDelete(record)}>
              <DeleteFilled style={{ fontSize: "1.1rem" }} />
            </Tag>
          </div>
        );
      },
    },
  ];

  const getData = () => {
    getAllTurns();
  };

  useEffect(getData, []);

  return (
    <div>
      <Row justify="space-between" gutter={[10, 10]}>
        <Col>
          <Title level={3}>Turnos</Title>
        </Col>
        <Col>
          <div>
            <Button onClick={handlerNewTurn} type="primary">
              Nuevo Turno
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <ShiftTable data={turns} columns={columns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

Turn.propTypes = {
  modal_turn: PropTypes.bool.isRequired,
  deleteTurn: PropTypes.func.isRequired,
  getAllTurns: PropTypes.func.isRequired,
  showNewTurn: PropTypes.func.isRequired,
  setObjectEditTurn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  turns: TurnsSelector().getAllTurns(state),
  modal_turn: ModalSelector().getFlagNewTurn(state),
});

export default connect(mapStateToProps, {
  deleteTurn,
  getAllTurns,
  showNewTurn,
  setObjectEditTurn,
})(Turn);
