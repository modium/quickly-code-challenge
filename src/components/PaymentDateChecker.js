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
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Payment Date Checker
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Invoice Due Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={invoiceDueDate}
              onChange={(e) => setInvoiceDueDate(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Payment Day
          </label>
          <div className="relative">
            <input
              type="date"
              value={payCycleDay}
              onChange={(e) => setPayCycleDay(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        {paymentDate && !error && (
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-blue-800">
              Your invoice pay date will be
              <span className="block mt-2 text-xl font-bold">
                {paymentDate}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
