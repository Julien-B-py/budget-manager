import styles from "./ButtonLoic.module.css";
import { useState } from "react";

const ButtonLoic = () => {
  const [message, setMessage] = useState("");
  function grr() {
    setMessage("GRRRRRRrrrrrrr");
  }
  return (
    <button className={styles.btn} onClick={grr} type="button">
      🐻
      {message}
    </button>
  );
};

export default ButtonLoic;
