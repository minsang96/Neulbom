import Breakfast from "./Breakfast";
import Dinner from "./Dinner";
import Lunch from "./Lunch";
import styled from "styled-components/native";

const Box = styled.View`
  width: 100%;
  margin: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DietList = () => {
  return (
    <>
      <Box>
        <Breakfast></Breakfast>
        <Lunch></Lunch>
        <Dinner></Dinner>
      </Box>
    </>
  );
};

export default DietList;
