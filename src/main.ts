import { createApp } from "vue";
import { FeedbackWidget } from "./section";
import { shortcuts } from "./untils/constants/shortcutStyle";
import buildcss from "../build.css?raw";

// window.feedbackConfig = {
//   theme: "ORANGE",
//   title: "Your Feedback is Valuable",
//   desc: "We truly appreciate your feedback! Your thoughts help us improve our products and services. We would be grateful if you could share your insights with us.",
//   minimizeTitle: "Minimize",
//   submitTitle: "Submit Feedback",
//   minimizeIconURL: "https://cdn-icons-png.flaticon.com/512/4658/4658825.png",
//   api: {
//     endpoind: "https://test-url/feedback",
//     token: "AIcZM1_pDWqYmh_Dummy-token",
//   }
//   modal: {
//     title: "Feedback Modal",
//     saveTitle: "Save",
//     closeTitle: "Close",
//     thanksMessage:
//       "Thank you! Your feedback is very valuable to us. We will continue to work to provide a better experience with your feedback.",
//   },
// };

(function () {
  const styles = buildcss;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const app = createApp({
    components: {
      FeedbackWidget,
    },
    data() {
      return {
        shortcuts,
      };
    },
    template: `<feedback-widget></feedback-widget>`,
  });

  const mountPoint = document.createElement("div");
  mountPoint.setAttribute("id", "feedback-widget-container");
  document.body.appendChild(mountPoint);

  app.mount(mountPoint);
})();
