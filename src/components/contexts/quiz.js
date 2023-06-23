import { createContext, useReducer } from "react";
import data from "../../data";

export const QuizContext = createContext();

const initialState = {
  currentQuestionIndex: 0,
  questions: data,
  showResults: false,
};

const reducer = (state, action) => {
  if (action.type === "NEXT_QUESTION") {
    const showResults =
      state.currentQuestionIndex === state.questions.length - 1;
    const currentQuestionIndex = showResults
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1;
    return {
      ...state,
      currentQuestionIndex,
      showResults,
    };
  }

  if (action.type === "RESTART") {
    return initialState;
  }

  return state;
};

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
