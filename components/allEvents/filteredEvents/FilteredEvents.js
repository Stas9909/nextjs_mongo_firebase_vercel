import Button from "@/components/ui/Button";
import styles from './FilteredEvents.module.css'
import { useRef } from "react";

const FilteredEvents = (props) => {

  const yearValueRef = useRef();
  const monthValueRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const yearValue = yearValueRef.current.value;
    const monthValue = monthValueRef.current.value;

    props.onFilter(yearValue, monthValue);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select name="" id="year" ref={yearValueRef}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select name="" id="month" ref={monthValueRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <Button>Search</Button>
      </div>
    </form>
  )
}

export default FilteredEvents;