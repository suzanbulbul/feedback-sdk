export type Theme = "TEAL" | "PINK" | "ORANGE";

interface FeedbackConfig {
  theme?: Theme;
  title?: string;
  desc?: string;
  minimizeTitle?: string;
  submitTitle?: string;
  minimizeIconURL?: string;
  modal?: {
    title?: string;
    saveTitle?: string;
    closeTitle?: string;
    thanksMessage?: string;
  };
}

declare global {
  interface Window {
    feedbackConfig?: FeedbackConfig;
  }
}
