import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breakfast: [],
  total_breakfast: [],
  lunch: [],
  total_lunch: [],
  dinner: [],
  total_dinner: [],
  imageurls: [],
  add: [],
  remove: [],
  num: 0,
  tempFood: [],
};

let nextId = 0;
let nextId_image = 0;
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    set: (state, action) => {
      state.total = [{ total: action.payload.total, id: Date.now() }];
      state.breakfast = action.payload.breakfast.dietList;
      state.total_breakfast = action.payload.breakfast.total;
      state.lunch = action.payload.lunch.dietList;
      state.total_lunch = action.payload.lunch.total;
      state.dinner = action.payload.dinner.dietList;
      state.total_dinner = action.payload.dinner.total;
    },

    add: (state, action) => {
      state.add.push({ food: action.payload.food, id: nextId });
      state[`total_${action.payload.current}`] = {
        ...state[`total_${action.payload.current}`],
        kcal:
          state[`total_${action.payload.current}`].kcal +
          action.payload.food.foodKcal,
        natrium:
          state[`total_${action.payload.current}`].natrium +
          action.payload.food.foodNatrium,
        sugars:
          state[`total_${action.payload.current}`].sugars +
          action.payload.food.foodSugars,
      };
      nextId += 1;
      // return {
      //   ...state,
      //   imageurls: [
      //     state.imageurls.map((myimage, index) => {
      //       if (index == state.imageurls.length - 1) {
      //         return { ...myimage, food: action.payload };
      //       }
      //     }),
      //   ],
      // };
    },
    addNum: (state, action) => {
      state.num += 1;
    },
    addFood: (state, action) => {
      state.tempFood = [action.payload];
    },
    addS3url: (state, action) => {
      return {
        ...state,
        add: [
          state.add.map((myimage, index) => {
            return { ...myimage, dietImg: action.payload[index] };
          }),
        ],
      };
    },

    addImageUrls: (state, action) => {
      state.imageurls.push({ imageurl: action.payload, id: nextId_image });
      nextId_image += 1;
    },

    remove: (state, action) => {
      nextId -= 1;
      nextId_image -= 1;
      return {
        ...state,
        imageurls: state.imageurls.filter(
          (image) => image.id !== action.payload
        ),
        add: state.add.filter((image) => image.id !== action.payload),
      };
    },
    clear: (state, action) => {
      state.imageurls = [];
      state.add = [];
      state.remove = [];
      state.tempFood = [];
      nextId = 0;
      nextId_image = 0;
    },

    removeDB: (state, action) => {
      console.log(action.payload);
      state.remove.push(action.payload);
    },
    remove_breakfast: (state, action) => {
      // state.remove.push(action.payload.dietSeq);
      return {
        ...state,
        breakfast: state.breakfast.filter(
          (food) => food.dietSeq !== action.payload
        ),
      };
    },
    remove_lunch: (state, action) => {
      return {
        ...state,
        lunch: state.lunch.filter((food) => food.dietSeq !== action.payload),
      };
    },
    remove_dinner: (state, action) => {
      return {
        ...state,
        dinner: state.dinner.filter((food) => food.dietSeq !== action.payload),
      };
    },
  },
});

export const {
  set,
  add,
  addImageUrls,
  remove,
  clear,
  addS3url,
  removeDB,
  addNum,
  addFood,
  remove_breakfast,
} = imagesSlice.actions;

export default imagesSlice;
