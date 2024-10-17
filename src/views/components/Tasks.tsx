import s from "../App/index.module.scss";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Task } from "../App";

type Props = {
  filteredTasks: Task[];
  removeTaskHandler: (taskId: number) => void;
  toggleTaskStatus: (taskId: number) => void;
};
export const Tasks = ({ filteredTasks, removeTaskHandler, toggleTaskStatus }: Props) => {
  return (
    <>
      {filteredTasks.map((el) => {
        return (
          <div className={s.task} key={el.id}>
            <Checkbox onChange={() => toggleTaskStatus(el.id)} checked={el.status === "completed"} />
            {el.title}
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
