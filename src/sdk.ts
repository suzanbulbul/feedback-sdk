import { createApp } from "vue";
import { FeedbackWidget } from "./section";
import { shortcuts } from "./until/style/shortcuts";
import buildcss from "../build.css?raw";

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
