import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { LuIndianRupee } from "react-icons/lu";

const DashboardContainer = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #030303;
  color: #ffffff;
  height: 100vh;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-size: 32px;

  span {
    margin-right: 5px;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
  font-size: 16px;
  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

const SelectedRadio = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #6741d9;
`;

const ChooseChargeDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20%;
  align-items: center;
  padding: 10px;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 0;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;

const RegularDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 0;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`;
const RegularPrice = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12.5%;
  position: relative;
  right: 15%;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    /* display: flex;
    flex-direction: column; */
    gap: 20%;
    margin-top: 10px;
  }
`;

const CustomInput = styled.input`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? "#555" : "#030303")};
  color: #ffffff;
  border: 1px solid #ffffff;
  text-align: center;
  border-radius: 10px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 50%;
    margin-top: 10px;
  }
`;
const RegularInput = styled.input`
  display: flex;
  text-align: center;
  width: 50px;
  font-size: 16px;
  height: 30px;
  background-color: ${({ disabled }) => (disabled ? "#555" : "#030303")};
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;

  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 30px;
  }
`;

const RupeeIcon = styled.div`
  font-size: 16px;
  position: absolute;
  top: 40%;
  margin-left: 10px;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    position: absolute;
    top: 70%;
    margin-left: 10px;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  background-color: ${({ disabled }) => (disabled ? "#555" : "#6741d9")};
  width: 600px;
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 0;

  &:hover {
    border: 1px solid #f0c3f1;
  }

  @media screen and (min-width: 320px) and (max-width: 767px) {
    width: 50%;
  }
`;

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [customAmount, setCustomAmount] = useState(99);
  const [regularAmounts, setRegularAmounts] = useState({
    category_7: 79,
    category_8: 59,
    category_9: 39,
    category_10: 19,
  });
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [isChargeCustomers, setIsChargeCustomers] = useState(false);
  const { adminId } = useParams();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.getAdminDetails(adminId);
        setIsChargeCustomers(response.data.charge_customers);
        setAdminData(response.data);
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
    console.log(window);

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

  const handleSave = async () => {
    try {
      await api.updatePrices(adminId, {
        category_6: customAmount,
        charge_customers: isChargeCustomers,
      });
      setSaveEnabled(false);
    } catch (error) {
      console.error("Failed to update prices", error);
    }
  };

  const handleCustomAmountChange = (e) => {
    const amount = parseInt(e.target.value, 10);
    setCustomAmount(amount);
    setSaveEnabled(amount > 98);
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
          (amount, index) => amount >= [79, 59, 39, 19][index]
        )
    );
  };

  const handleChargeCustomersChange = (e) => {
    setIsChargeCustomers(e.target.id === "yes");
  };

  return (
    <DashboardContainer>
      {adminData && (
        <div>
          <Heading>
            <span style={{ display: "flex", flexDirection: "row" }}>
              <span>{adminData.name},</span>
              <span>{adminData.location}</span>
            </span>
            <span>on Dhun Jam</span>
          </Heading>
          <ChooseChargeDiv>
            <span>
              Do you want to charge your <br /> customers for requesting songs?
            </span>
            <RadioContainer>
              <SelectedRadio
                type="radio"
                id="yes"
                name="chargeCustomers"
                checked={isChargeCustomers}
                onChange={handleChargeCustomersChange}
              />
              <StyledLabel htmlFor="yes">Yes</StyledLabel>
              <SelectedRadio
                type="radio"
                id="no"
                name="chargeCustomers"
                checked={!isChargeCustomers}
                onChange={handleChargeCustomersChange}
              />
              <StyledLabel htmlFor="no">No</StyledLabel>
            </RadioContainer>
          </ChooseChargeDiv>
          {isChargeCustomers ? (
            <>
              <Div>
                <span>Custom song request amount-</span>
                <CustomInput
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  min={99}
                  disabled={!isChargeCustomers}
                />
              </Div>
              <RegularDiv>
                <span>
                  Regular song request amounts, <br /> from high to low-
                </span>

                <RegularPrice>
                  {[7, 8, 9, 10].map((category) => (
                    <div key={category}>
                      <div>
                        <RegularInput
                          type="number"
                          value={regularAmounts[`category_${category}`]}
                          onChange={(e) =>
                            handleRegularAmountChange(
                              `category_${category}`,
                              e.target.value
                            )
                          }
                          min={[79, 59, 39, 19][category - 7]}
                          disabled={!isChargeCustomers}
                        />
                      </div>
                    </div>
                  ))}
                </RegularPrice>
              </RegularDiv>
            </>
          ) : null}
          {isChargeCustomers && (
            <div>
              <RupeeIcon>
                <LuIndianRupee size={35} />
              </RupeeIcon>

              <BarChart
                width={window.innerWidth > 767 ? 600 : window.innerWidth - 30}
                // width={600}
                height={400}
                data={[
                  { name: "Custom", amount: customAmount },
                  { name: "Category 1", amount: regularAmounts.category_7 },
                  { name: "Category 2", amount: regularAmounts.category_8 },
                  { name: "Category 3", amount: regularAmounts.category_9 },
                  { name: "Category 4", amount: regularAmounts.category_10 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#FFFFFF" />
                <YAxis stroke="#FFFFFF" tick={false} />

                <Tooltip />

                <Bar
                  dataKey="amount"
                  fill="#F0C3F1"
                  barSize={30}
                  shape={({ x, y, width, height }) => (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={5}
                      ry={5}
                      style={{ fill: "#F0C3F1" }}
                    />
                  )}
                />
              </BarChart>
            </div>
          )}
          <Button
            onClick={handleSave}
            disabled={!isSaveEnabled || !isChargeCustomers}
          >
            Save
          </Button>
        </div>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
