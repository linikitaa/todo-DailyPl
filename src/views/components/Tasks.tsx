import s from "../App/index.module.scss";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Task } from "../App";
import { EditableSpan } from "./EditableSpan.tsx";

type Props = {
  filteredTasks: Task[];
  removeTaskHandler: (taskId: number) => void;
  toggleTaskStatus: (taskId: number) => void;
  updateTaskTitle: (taskId: number, newTitle: string) => void;
};
export const Tasks = ({ filteredTasks, removeTaskHandler, toggleTaskStatus, updateTaskTitle }: Props) => {
  return (
    <>
      {filteredTasks.map((el) => {
        return (
          <div className={s.task} key={el.id}>
            <Checkbox onChange={() => toggleTaskStatus(el.id)} checked={el.status === "completed"} />
            <EditableSpan value={el.title} onChange={(newTitle) => updateTaskTitle(el.id, newTitle)} />
            <span className={s.date}>{el.date}</span>
            <CloseCircleOutlined
              onClick={() => removeTaskHandler(el.id)}
              style={{ color: "red", fontSize: "22px", cursor: "pointer" }}
            />
          </div>
        );
      })}
    </>
  );
};
