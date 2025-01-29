import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { apiCall } from "../../api/login";

const PaymentHistoryData = () => {
  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return "green-500 text-white";
      case "PENDING":
        return "gray-500 text-white";
      case "INITIATED":
        return "red-500 text-white";
      default:
        return "blue-500 text-white";
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.billingName,
      width: "150px",
    },
    {
      name: "Plan Name",
      selector: (row) => row.planName,
      width: "200px",
    },
    {
      name: "amount",
      selector: (row) => row.amount / 100,
      width: "150px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.billingPhoneNumber,
      width: "200px",
    },
    {
      name: "Payment Initiate Date",
      selector: (row) => row.paymentInitiateDate,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`bg-${getBadge(
            row.status
          )} rounded-full py-1 px-3 text-[10px] font-medium`}
        >
          {row.status}
        </button>
      ),
      width: "150px",
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const response = (await apiCall.get(`user_transactions/${userID.userid}`))
        .data;
      setLoading(false);
      setData(response.transactions);
    } catch (error) {
      console.log("error fetching question: ", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DataTable
        title="Payment History"
        columns={columns}
        data={data}
        pagination
        progressPending={loading}
        responsive={true}
        highlightOnHover={true}
        striped={true}
        progressComponent={<span>loading...</span>}
      />
    </>
  );
};

export default PaymentHistoryData;
