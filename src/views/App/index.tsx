import s from "./index.module.scss";
import Input from "antd/lib/input";
import DatePicker from "antd/lib/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { CheckSquareOutlined, CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Select from "antd/lib/select";
import { ChangeEvent, useState } from "react";
import { Filtered } from "../components/filtered.tsx";

export type Status = "all" | "active" | "completed";
export type Task = {
  id: number;
  title: string;
  date: string;
  status: Status;
};

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [task, setTask] = useState<Task[]>([
    { id: 1, status: "active", title: "cook", date: "12/12/2222" },
    { id: 2, status: "active", title: "sport", date: "12/12/2222" },
    { id: 3, status: "completed", title: "less", date: "12/12/2222" },
  ]);
  let [title, setTitle] = useState("");
  const addTaskHandler = () => {
    if (title.trim() !== "" && selectedDate) {
      setTask([...task, { id: 4, title: title, status: "active", date: selectedDate.format("DD/MM/YY") }]);
      setTitle("");
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const removeTaskHandler = (taskId: number) => {
    setTask(task.filter((el) => el.id !== taskId));
  };

  const onChangeDateHandler = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  return (
    <>
      <main className={s.todoWrap}>
        <h1 className={s.title}>To do Plan Daily</h1>
        <div className={s.add}>
          <Input style={{ maxWidth: "67%" }} placeholder="Basic usage" value={title} onChange={onChangeHandler} />
          <DatePicker
            onChange={onChangeDateHandler}
            defaultValue={dayjs(dayjs(), dateFormatList[0])}
            format={dateFormatList}
          />
          <PlusCircleOutlined
            onClick={addTaskHandler}
            style={{ color: "green", fontSize: "30px", cursor: "pointer" }}
          />
        </div>
        <div className={s.filterSort}>
          <Filtered task={task} />
          <Select onChange={() => {}} defaultValue={"По возрастанию"}>
            <Select.Option value="top">По возрастанию</Select.Option>
            <Select.Option value="down">По убыванию</Select.Option>
          </Select>
        </div>
        <div className={s.tasks}>
          {task.map((el) => {
            return (
              <div className={s.task} key={el.id}>
                <CheckSquareOutlined
                  style={{
                    color: el.status === "active" || el.status === "all" ? "#9be4f5" : "#6b19b4",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                />
                {el.title}
                <span className={s.date}>{el.date}</span>
                <CloseCircleOutlined
                  onClick={() => removeTaskHandler(el.id)}
                  style={{ color: "red", fontSize: "22px", cursor: "pointer" }}
                />
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
