import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import { TbReportMoney } from "react-icons/tb";
import { MdOutlineMenuBook } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

import { Hamburger, Container, User } from "./style.js";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {!isOpen && (
        <Hamburger onClick={toggleMenu} aria-label="Abrir menu">
          <FaBars size={35} />
        </Hamburger>
      )}
      <Container isOpen={isOpen}>
        <FaTimes
          className="close-btn"
          size={35}
          onClick={toggleMenu}
          aria-label="Fechar menu"
        />

        <ul>
          <li>
            <User>
              <FaUser /> Admin
            </User>
          </li>

          <li>
            <Link to="/" onClick={toggleMenu}>
              <FaHome /> Mesas
            </Link>
          </li>
          <li>
            <Link to="/pedidos" onClick={toggleMenu}>
              <IoMdRestaurant /> Pedidos
            </Link>
          </li>
          <li>
            <Link to="/produtos" onClick={toggleMenu}>
              <MdOutlineMenuBook /> Produtos
            </Link>
          </li>
          <li>
            <Link to="/relatorio" onClick={toggleMenu}>
              <TbReportMoney /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/configuracao">
              <IoMdSettings />
              Configurações
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
