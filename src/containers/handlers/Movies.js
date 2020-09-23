import React from "react";
import Moment from "moment";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { useEffect } from "react";
import {
  LockFilled,
  EditFilled,
  DeleteFilled,
  MenuOutlined,
  UnlockFilled,
} from "@ant-design/icons";
import { Col, Row, Tag, Card, Button, Typography } from "antd";

import AssignShift from "./AssignShift";
import TableMovie from "../../components/tables";
import TurnSelector from "../../redux-selectors/turns";
import ModalSelector from "../../redux-selectors/modals";
import MoviesSelector from "../../redux-selectors/movies";

import { getAllTurns } from "../../redux-actions/turns";
import { showNewMovie } from "../../redux-actions/modals";
import {
  editMovie,
  assignTurn,
  deleteMovie,
  getAllMovies,
  setObjectEditMovie,
} from "../../redux-actions/movies";

const { Title } = Typography;

const Movies = (props) => {
  const {
    turns,
    movies,
    assignTurn,
    getAllTurns,
    deleteMovie,
    modal_movies,
    showNewMovie,
    getAllMovies,
    setObjectEditMovie,
  } = props;

  const onHandlerShowMovie = (e) => showNewMovie(!modal_movies);

  const onHandlerEdit = (e) => {
    showNewMovie(!modal_movies);
    setObjectEditMovie(e);
  };

  const onHandlerDelete = (e) => deleteMovie(e.id);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Fecha Publicación",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (text, record, index) => {
        return Moment(text).format("DD/MM/YYYY");
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => {
        let obj = {
          [true]: "Activo",
          [false]: "Inactivo",
        };
        return obj[text];
      },
    },
    {
      title: "Turno",
      dataIndex: "turn",
      key: "turn",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (text, record, index) => {
        return (
          <div>
            <Tag key="1" color="green" onClick={() => onHandlerEdit(record)}>
              <EditFilled style={{ fontSize: "1.1rem" }} />
            </Tag>
            <AssignShift turns={turns} record={record} assignTurn={assignTurn}>
              <Tag key="2" color="purple">
                <MenuOutlined style={{ fontSize: "1.1rem" }} />
              </Tag>
            </AssignShift>
            <Tag key="3" color="geekblue">
              {React.createElement(record.turn ? LockFilled : UnlockFilled, {
                style: { fontSize: "1.1rem" },
              })}
            </Tag>
            <Tag
              key="4"
              color="volcano"
              onClick={() => onHandlerDelete(record)}
            >
              <DeleteFilled style={{ fontSize: "1.1rem" }} />
            </Tag>
          </div>
        );
      },
    },
  ];

  const getData = () => {
    getAllTurns();
    getAllMovies();
  };

  useEffect(getData, []);

  return (
    <>
      <Row justify="space-between" gutter={[10, 10]}>
        <Col>
          <Title level={3}>Peliculas</Title>
        </Col>
        <Col>
          <div>
            <Button type="primary" onClick={onHandlerShowMovie}>
              Nueva Pelicula
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card>
            <TableMovie data={movies} columns={columns} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

Movies.propTypes = {
  editMovie: PropTypes.func.isRequired,
  assignTurn: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  getAllTurns: PropTypes.func.isRequired,
  modal_movies: PropTypes.bool.isRequired,
  showNewMovie: PropTypes.func.isRequired,
  getAllMovies: PropTypes.func.isRequired,
  setObjectEditMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  turns: TurnSelector().getAllTurns(state),
  movies: MoviesSelector().getAllMovies(state),
  modal_movies: ModalSelector().getFlagNewMovie(state),
});

export default connect(mapStateToProps, {
  editMovie,
  assignTurn,
  getAllTurns,
  deleteMovie,
  showNewMovie,
  getAllMovies,
  setObjectEditMovie,
})(Movies);
