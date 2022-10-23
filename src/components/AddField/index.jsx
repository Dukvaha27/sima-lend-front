import React, { useState } from "react";
import useData from "../../services/useData";
import { Button, TextField } from "@mui/material";
import Modal from "../Modal";
import styles from "./addField.module.css";

const AddField = ({ onClose }) => {
  const { steps, addFieldHandler, fields } = useData();

  const [data, setData] = useState({
    id: fields.length + 1,
    stepId: steps[0].id,
    label: "",
    name: "",
    required: false,
  });

  const { stepId, label, name, required } = data;

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const onNewFieldHandler = () => {
    addFieldHandler(data);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.field_block}>
        <label>Выберите страницу</label>
        <select
          value={stepId}
          onChange={({ target }) =>
            setData({ ...data, stepId: Number(target.value) })
          }
        >
          {steps.map((el) => (
            <option value={el.id}> {el.label}</option>
          ))}
        </select>
      </div>

      <TextField
        name={"name"}
        value={name}
        label={"имя для базы"}
        margin={"dense"}
        fullWidth
        onChange={(event) => handleChange(event)}
      />
      <TextField
        name={"label"}
        value={label}
        label={"Имя поля показа"}
        margin={"dense"}
        fullWidth
        onChange={(event) => handleChange(event)}
      />
      <div style={{ marginBottom: ".5rem" }}>
        <input
          id={"check"}
          type={"checkbox"}
          checked={required}
          onChange={() => setData({ ...data, required: !required })}
        />
        <label htmlFor="#check"> Сделать поле обязательным</label>
      </div>

      <Button
        variant={"contained"}
        color={"primary"}
        onClick={onNewFieldHandler}
        fullWidth
      >
        Добавить новое поле
      </Button>
    </Modal>
  );
};

export default AddField;
