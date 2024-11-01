import { FormType } from "../../section/FeedbackWidget/index.vue";

interface Type {
  name: string;
  value: FormType;
}

export const useLocalStorage = ({ name, value }: Type) => {
  const feedbackArray = JSON.parse(localStorage.getItem(name) || "[]");

  feedbackArray.push(value);

  localStorage.setItem(name, JSON.stringify(feedbackArray));

  return feedbackArray;
};
