import _ from "lodash";
import React from "react";
import Moment from "moment";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Modal,
  Button,
  Checkbox,
  TimePicker,
  Typography,
} from "antd";

import TurnSelector from "../../redux-selectors/turns";
import ModalSelector from "../../redux-selectors/modals";

import { addTurn, editTurn } from "../../redux-actions/turns";
import { showNewTurn } from "../../redux-actions/modals";

const { Title } = Typography;

const Turns = (props) => {
  const {
    turns,
    addTurn,
    editTurn,
    modal_turn,
    showNewTurn,
    obj_edit_turn,
  } = props;

  const [timeV, setTimeV] = useState(Moment());
  const [checkV, setcheckV] = useState(false);

  const onClose = () => {
    showNewTurn(!modal_turn);
  };

  const onChangeTime = (e) => setTimeV(e);

  const onChangeCheck = (e) => setcheckV(e.target.checked);

  const genId = (a) => {
    const sortData = (a, b) => {
      if (parseInt(a.id) > parseInt(b.id)) return 1;
      if (parseInt(a.id) < parseInt(b.id)) return -1;
    };

    const data = a.sort(sortData);
    let Oid = data[data.length - 1];
    return Oid && Oid.id;
  };

  const onHandlerTurn = (e) => {
    let idG = genId(turns),
      id = idG ? parseInt(idG) + 1 : 1;

    let obj = {
      id: String(id),
      turn: Moment(timeV).format("HH:mm"),
      status: checkV,
      actions: true,
    };

    addTurn(obj);
    onClose();
  };

  const onHandlerEditTurn = (e) => {
    let obj = _.assign(obj_edit_turn, {
      status: checkV,
      turn: Moment(timeV).format("HH:mm"),
    });
    editTurn(obj);
    onClose();
  };

  useEffect(() => {
    if (!_.isEmpty(obj_edit_turn)) {
      setTimeV(Moment(obj_edit_turn.turn, "HH:mm"));
      setcheckV(obj_edit_turn.status);
    }

    return () => {
      setTimeV(Moment());
      setcheckV(false);
    };
  }, [obj_edit_turn]);

  return (
    <Modal
      onOk={onClose}
      title={<Title level={2}>Turnos</Title>}
      visible={modal_turn}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={
            !_.isEmpty(obj_edit_turn) ? onHandlerEditTurn : onHandlerTurn
          }
        >
          {!_.isEmpty(obj_edit_turn) ? "Editar" : "Guardar"}
        </Button>,
      ]}
      onCancel={onClose}
    >
      <Row justify="space-between">
        <Col span={12}>
          <Title level={4}>Hora turno</Title>
        </Col>
        <Col span={12}>
          <TimePicker
            value={Moment(timeV)}
            style={{ width: "100%" }}
            onChange={onChangeTime}
            placeholder="seleccione hora"
          />
        </Col>
      </Row>
      <Row justify="start">
        <Col span={24}>
          <Checkbox value={checkV} checked={checkV} onChange={onChangeCheck}>
            Activo ?
          </Checkbox>
        </Col>
      </Row>
    </Modal>
  );
};

Turns.propTypes = {
  turns: PropTypes.array.isRequired,
  editTurn: PropTypes.func.isRequired,
  modal_turn: PropTypes.bool.isRequired,
  showNewTurn: PropTypes.func.isRequired,
  obj_edit_turn: PropTypes.object,
};

const mapStateToProps = (state) => ({
  turns: TurnSelector().getAllTurns(state),
  modal_turn: ModalSelector().getFlagNewTurn(state),
  obj_edit_turn: TurnSelector().getObjectEditTurn(state),
});

export default connect(mapStateToProps, { addTurn, editTurn, showNewTurn })(
  Turns
);
