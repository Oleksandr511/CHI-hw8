import React from "react";
import styles from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MuseumIcon from '@mui/icons-material/Museum';

export default function Header() {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <MuseumIcon style={{ fontSize: 40 }} />
      <nav>
        <ul className={styles.navigation}>
          <li>
            <Link
              className={
                location.pathname === "/home" ? styles.active : styles.static
              }
              to="/home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/" ? styles.active : styles.static
              }
              to="/"
            >
              Exhibits
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/new-post"
                  ? styles.active
                  : styles.static
              }
              to="/new-post"
            >
              New post
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/login" ? styles.active : styles.static
              }
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/register"
                  ? styles.active
                  : styles.static
              }
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
