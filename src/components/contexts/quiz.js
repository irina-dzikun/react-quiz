import { createContext, useReducer } from "react";
import questions from "../../data";
import { shuffleAnswers } from "../../helpers";

export const QuizContext = createContext();

const initialState = {
  currentQuestionIndex: 0,
  questions,
  showResults: false,
  answers: shuffleAnswers(questions[0]),
  currentAnswer: "",
  correctAnswersCount: 0,
};

const reducer = (state, action) => {
  if (action.type === "SELECT_ANSWER") {
    const correctAnswersCount =
      action.payload ===
      state.questions[state.currentQuestionIndex].correctAnswer
        ? state.correctAnswersCount + 1
        : state.correctAnswersCount;
    return {
      ...state,
      currentAnswer: action.payload,
      correctAnswersCount,
    };
  }
  if (action.type === "NEXT_QUESTION") {
    const showResults =
      state.currentQuestionIndex === state.questions.length - 1;
    const currentQuestionIndex = showResults
      ? state.currentQuestionIndex
      : state.currentQuestionIndex + 1;
    const answers = showResults
      ? []
      : shuffleAnswers(state.questions[currentQuestionIndex]);
    return {
      ...state,
      currentQuestionIndex,
      showResults,
      answers,
      currentAnswer: "",
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
