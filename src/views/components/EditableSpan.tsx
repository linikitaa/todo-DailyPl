import s from "../App/index.module.scss";
import { ChangeEvent, useState } from "react";

type Props = {
  value: string;
  onChange: (newTitle: string) => void;
};

export function EditableSpan({ value, onChange }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(value);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditMode(true);
    setNewTitle(e.currentTarget.value);
  };

  const activateEditModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    onChange(newTitle);
    setEditMode(false);
  };
  return (
    <>
      {editMode ? (
        <input
          type="text"
          value={newTitle}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  );
}
