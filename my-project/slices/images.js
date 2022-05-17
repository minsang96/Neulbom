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
      state.add.push({ food: action.payload.tempFood, id: nextId });
      state[`total_${action.payload.current}`] = {
        ...state[`total_${action.payload.current}`],
        kcal:
          state[`total_${action.payload.current}`].kcal +
          action.payload.tempFood.foodKcal,
        natrium:
          state[`total_${action.payload.current}`].natrium +
          action.payload.tempFood.foodNatrium,
        sugars:
          state[`total_${action.payload.current}`].sugars +
          action.payload.tempFood.foodSugars,
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
      nextId = 0;
      nextId_image = 0;
    },

    removeDB: (state, action) => {
      console.log(action.payload);
      state.remove.push(action.payload.dietSeq);
      // if (action.payload.current == "breakfast") {
      return {
        ...state,
        breakfast: [
          state.breakfast.filter(
            (food) => food.dietSeq !== action.payload.dietSeq
          ),
        ],
        // };
      };
      //   } else if (action.payload.current == "lunch") {
      //     return {
      //       ...state,
      //       lunch: state.lunch.filter(
      //         (food) => food.dietSeq !== action.payload.dietSeq
      //       ),
      //     };
      //   } else if (action.payload.current == "dinner") {
      //     return {
      //       ...state,
      //       dinner: state.dinner.filter(
      //         (food) => food.dietSeq !== action.payload.dietSeq
      //       ),
      //     };
      //   }
    },
  },
});

export const { set, add, addImageUrls, remove, clear, addS3url, removeDB } =
  imagesSlice.actions;

export default imagesSlice;
