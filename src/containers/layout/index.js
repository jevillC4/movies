import React from "react";

import { Link, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  CaretUpOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import Body from "./Body";
import Turns from "../modals/Turns";
import Movies from "../drawers/Movies";

import "./style.css";

const { Title } = Typography;
const { Header, Sider } = Layout;

const classNames = {
  trigger: {
    fontSize: "18px",
    lineHeight: "64px",
    padding: "0 24px",
    cursor: "pointer",
    transition: "color 0.3s",
  },
  logo: {
    height: "32px",
    background: "rgba(255, 255, 255, 0.2)",
    margin: "16px",
  },
};

const LayoutMain = (props) => {
  let { url } = useRouteMatch();

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Turns />
      <Movies />
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={classNames.logo}>
          <Title style={{ color: "#fff", textAlign: "center" }} level={3}>
            M
          </Title>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
            <Link to={`${url}/dashboard`} />
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Peliculas
            <Link to={`${url}/movies`} />
          </Menu.Item>
          <Menu.Item key="3" icon={<CaretUpOutlined />}>
            Turnos
            <Link to={`${url}/turn`} />
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Administradores
            <Link to={`${url}/admin`} />
          </Menu.Item>
          <Menu.Item key="5" icon={<ProfileOutlined />}>
            Perfil
            <Link to={`${url}/profile`} />
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            Cerrar Sesion
            <Link to={`${url}/logout`} />
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#fff" }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              style: classNames.trigger,
              onClick: toggle,
            }
          )}
        </Header>
        <Body />
      </Layout>
    </Layout>
  );
};

LayoutMain.propTypes = {};

export default LayoutMain;
