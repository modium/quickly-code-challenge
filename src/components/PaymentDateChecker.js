import React, { useState, useEffect } from "react";

export default function PaymentDateChecker() {
  const [invoiceDueDate, setInvoiceDueDate] = useState(null);
  const [payCycleDay, setPayCycleDay] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  const [error, setError] = useState(null);

  const calculatePaymentDate = () => {
    try {
      const dueDate = new Date(invoiceDueDate);
      // abstract the day of the month from payCycleDay
      const cycleDay = parseInt(payCycleDay.substring(payCycleDay.length - 2));

      if (cycleDay < 1 || cycleDay > 31) {
        setError("Please enter a valid day between 1 and 31");
        setPaymentDate(null);
        return;
      }

      let paymentDate = new Date(
        dueDate.getFullYear(),
        dueDate.getMonth(),
        cycleDay
      );

      if (dueDate.getDate() > cycleDay) {
        paymentDate.setMonth(paymentDate.getMonth() + 1);
      }

      if (paymentDate.getDate() !== cycleDay) {
        paymentDate = new Date(
          paymentDate.getFullYear(),
          paymentDate.getMonth(),
          0
        );
      }

      setPaymentDate(
        paymentDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setError(null);
    } catch (err) {
      setError("Please enter valid dates");
      setPaymentDate(null);
    }
  };

  useEffect(() => {
    if (invoiceDueDate !== null && payCycleDay !== null) {
      calculatePaymentDate();
    }
  }, [invoiceDueDate, payCycleDay]);

  return (
    <div>
      <h2>Payment Date Checker</h2>
      <div>
        <div>
          <label>Invoice Due Date</label>
          <div>
            <input
              type="date"
              value={invoiceDueDate}
              onChange={(e) => setInvoiceDueDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label>Monthly Payment Day</label>
          <div>
            <input
              type="date"
              value={payCycleDay}
              onChange={(e) => setPayCycleDay(e.target.value)}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        {paymentDate && !error && (
          <div>
            <p>
              Your invoice pay date will be
              <span>{paymentDate}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
