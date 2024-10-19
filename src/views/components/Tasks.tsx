import s from "../App/index.module.scss";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Task } from "../App";
import { EditableSpan } from "./EditableSpan.tsx";
import { Button, message, Popconfirm, PopconfirmProps } from "antd";

type Props = {
  filteredTasks: Task[];
  removeTaskHandler: (taskId: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  updateTaskTitle: (taskId: string, newTitle: string) => void;
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
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                removeTaskHandler(el.id);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  padding: "1px 5px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginBottom: "3px",
                  backgroundColor: "inherit",
                  color: "#c70505",
                  border: "1px solid #c70505",
                  height: "25px",
                }}
                danger
              ></Button>
            </Popconfirm>
          </div>
        );
      })}
    </>
  );
};
