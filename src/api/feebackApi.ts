import axios from "axios";

//Type
import { FormType } from "../section/FeedbackWidget/index.vue";

const apiBaseUrl = window.feedbackConfig?.api.endpoind;

const apiConfig = {
  headers: {
    Authorization: window.feedbackConfig?.api.token,
    "Content-Type": "application/json",
  },
};

export const FeedbackApi = {
  createFeedback: async (form: FormType) => {
    try {
      const response = await axios.post(`${apiBaseUrl}`, form, apiConfig);
      return response;
    } catch (error) {
      return { error: error };
    }
  },
};
