import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DashboardContainer = styled.div`
  /* font-family: Poppins; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #030303;
  color: #ffffff;
  /* height: 94.5vh; */
`;

const Button = styled.button`
  box-sizing: border-box;
  background-color: #6741d9;
  width: 600px;
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #333;
  border-radius: 10px;

  &:hover {
    border: 1px solid #f0c3f1;
  }
`;

const AdminDashboard = ({ adminId }) => {
  const [adminData, setAdminData] = useState(4);
  const [customAmount, setCustomAmount] = useState(0);
  const [regularAmounts, setRegularAmounts] = useState({});
  const [isSaveEnabled, setSaveEnabled] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.getAdminDetails(adminId);
        console.log(adminId);
        setAdminData(response.data);
        console.log(response.data);
        setCustomAmount(response.data.amount.category_6);
        setRegularAmounts({
          category_7: response.data.amount.category_7,
          category_8: response.data.amount.category_8,
          category_9: response.data.amount.category_9,
          category_10: response.data.amount.category_10,
        });
        setSaveEnabled(false);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

  const handleSave = async () => {
    try {
      await api.updatePrices(adminId, { category_6: customAmount });
      setSaveEnabled(false);
    } catch (error) {
      console.error("Failed to update prices", error);
    }
  };

  const handleCustomAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setCustomAmount(amount);
    setSaveEnabled(amount > 99);
  };

  const handleRegularAmountChange = (key, value) => {
    const updatedRegularAmounts = {
      ...regularAmounts,
      [key]: parseInt(value, 10),
    };
    setRegularAmounts(updatedRegularAmounts);
    setSaveEnabled(
      Object.values(updatedRegularAmounts).every((amount) => amount > 0) &&
        Object.values(updatedRegularAmounts).every(
          (amount, index) => amount > [99, 79, 59, 39][index]
        )
    );
  };

  return (
    <DashboardContainer>
      <h1>Admin Dashboard</h1>
      {adminData && (
        <div>
          <p>Social: {adminData.name}</p>
          <p>Hebbal: {adminData.location}</p>
          <p>Do you want to charge customers for requesting songs?</p>
          <input
            type="radio"
            id="yes"
            name="chargeCustomers"
            checked={adminData.charge_customers}
            readOnly
          />
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="no"
            name="chargeCustomers"
            checked={!adminData.charge_customers}
            readOnly
          />
          <label htmlFor="no">No</label>
          {/* {adminData.charge_customers && ( */}
          <>
            <p>Custom song request amount-</p>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              min={99}
            />
            <p>Regular song request amounts, from high to low-</p>
            {[7, 8, 9, 10].map((category) => (
              <input
                key={category}
                type="number"
                value={regularAmounts[`category_${category}`]}
                onChange={(e) =>
                  handleRegularAmountChange(
                    `category_${category}`,
                    e.target.value
                  )
                }
                min={[79, 59, 39, 19][category - 7]}
              />
            ))}
          </>
          {/* )} */}

          {/* {adminData.charge_customers && ( */}
          <BarChart
            width={600}
            height={400}
            data={[
              { name: "Custom Amount", amount: customAmount },
              { name: "Category 1", amount: regularAmounts.category_7 },
              { name: "Category 2", amount: regularAmounts.category_8 },
              { name: "Category 3", amount: regularAmounts.category_9 },
              { name: "Category 4", amount: regularAmounts.category_10 },
            ]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" stroke="#FFFFFF" />
            <YAxis stroke="#FFFFFF" tick={false} />
            {/* <CartesianGrid stroke="#FFFFFF" strokeDasharray="5 5" /> */}
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#F0C3F1" />
          </BarChart>
          {/* )
          } */}
          <Button onClick={handleSave} disabled={!isSaveEnabled}>
            Save
          </Button>
        </div>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
