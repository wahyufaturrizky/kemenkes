"use client";

import styles from "./datepicker.module.css";
import { LuCalendarDays } from "react-icons/lu";
import ReactDatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from "react-datepicker";
import id from "date-fns/locale/id";

// @ts-ignore
registerLocale("id", id);
interface DatePickerProps extends ReactDatePickerProps {}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <div className={`flex items-center gap-2 relative`}>
      <ReactDatePicker
        {...props}
        locale="id"
        className={`${props.className} ${styles.datepickerinput}`}
        selected={props.startDate}
        // @ts-ignore
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        dateFormat="dd MMMM yyyy"
        // selectsRange
        // inline
      />
      <LuCalendarDays className="right-4 absolute" />
    </div>
  );
};

export default DatePicker;
