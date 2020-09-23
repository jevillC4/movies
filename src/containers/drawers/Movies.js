import _ from "lodash";
import React from "react";
import Moment from "moment";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Drawer,
  Button,
  DatePicker,
  Typography,
} from "antd";

import ModalSelector from "../../redux-selectors/modals";
import MoviesSelector from "../../redux-selectors/movies";

import { showNewMovie } from "../../redux-actions/modals";
import {
  addMovie,
  editMovie,
  setObjectEditMovie,
} from "../../redux-actions/movies";

const { Title } = Typography;
const { Option } = Select;

const Movies = ({
  movies,
  addMovie,
  editMovie,
  object_edit,
  modal_movies,
  showNewMovie,
  setObjectEditMovie,
}) => {
  const [form] = Form.useForm();

  const genId = (a) => {
    const sortData = (a, b) => {
      if (parseInt(a.id) > parseInt(b.id)) return 1;
      if (parseInt(a.id) < parseInt(b.id)) return -1;
    };

    const data = a.sort(sortData);
    let Oid = data[data.length - 1];
    return Oid && Oid.id;
  };

  const onClose = () => {
    showNewMovie(!modal_movies);
    setObjectEditMovie({});
    form.resetFields();
  };

  const onFinish = (e) => {
    let idG = genId(movies),
      id = idG ? parseInt(idG) + 1 : 1;
    const t = _.assign(e, { id: String(id), actions: true });
    addMovie(t);
    onClose();
  };

  const onEdit = (e) => {
    let obj = _.assign(e, { id: object_edit.id });
    editMovie(obj);
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    const onFill = (o) =>
      form.setFieldsValue({
        id: o.id,
        name: o.name,
        publishDate: Moment(o.publishDate),
        status: o.status,
        actions: o.actions,
      });

    if (!_.isEmpty(object_edit)) {
      onFill(object_edit);
    }
  }, [form, object_edit]);

  return (
    <Drawer
      title={<Title level={4}>Nueva Película</Title>}
      width={"40%"}
      onClose={onClose}
      closable={false}
      placement="right"
      visible={modal_movies}
    >
      <Form
        name="hook-movie"
        form={form}
        layout="vertical"
        onFinish={!_.isEmpty(object_edit) ? onEdit : onFinish}
      >
        <Form.Item
          name="name"
          label="Nombre película"
          rules={[
            {
              required: true,
              message: "Este valor es obligatorio!",
            },
          ]}
        >
          <Input placeholder="ingrese un nombre de película" />
        </Form.Item>

        <Form.Item
          name="publishDate"
          label="Fecha publicacíon"
          rules={[
            {
              required: true,
              message: "Este valor es obligatorio!",
            },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            placeholder="seleccione fecha"
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Estado"
          rules={[
            {
              required: true,
              message: "Este valor es obligatorio!",
            },
          ]}
        >
          <Select style={{ width: "100%" }} placeholder="seleccione un estado">
            <Option value={true}>Activo</Option>
            <Option value={false}>Inactivo</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {!_.isEmpty(object_edit) ? "Editar" : "Guardar"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  addMovie: PropTypes.func.isRequired,
  editMovie: PropTypes.func.isRequired,
  object_edit: PropTypes.object,
  modal_movies: PropTypes.bool.isRequired,
  showNewMovie: PropTypes.func.isRequired,
  setObjectEditMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: MoviesSelector().getAllMovies(state),
  object_edit: MoviesSelector().getObjectEdit(state),
  modal_movies: ModalSelector().getFlagNewMovie(state),
});

export default connect(mapStateToProps, {
  addMovie,
  editMovie,
  showNewMovie,
  setObjectEditMovie,
})(Movies);
