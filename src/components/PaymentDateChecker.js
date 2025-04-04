import React, { useEffect, useState } from "react";
import moment from "moment";

export default function PaymentDateChecker() {
  const [invoiceDueDate, setInvoiceDueDate] = useState(null);
  const [payCycleDate, setPayCycleDate] = useState(null);
  const [payDateText, setPayDateText] = useState("");

  useEffect(() => {
    if (invoiceDueDate !== null && payCycleDate !== null) {
      let payDate = moment(payCycleDate).format("MMMM Do");
      setPayDateText("Your invoice pay date will be on " + payDate);
    }
  }, [invoiceDueDate, payCycleDate]);

  return (
    <div>
      <h3>Payment Date Checker</h3>
      <h3>Invoice due date: {invoiceDueDate}</h3>
      <h3>Pay cycle date: {payCycleDate}</h3>
      <div>
        <h3>Invoice due date</h3>
        <input
          type="date"
          onChange={(e) => setInvoiceDueDate(e.target.value)}
        />
      </div>
      <div>
        <h3>Pay cycle date</h3>
        <input type="date" onChange={(e) => setPayCycleDate(e.target.value)} />
      </div>
      <p>{payDateText}</p>
    </div>
  );
}
