import { createApp } from "vue";
import { FeedbackWidget } from "./section";
import { shortcuts } from "./untils/constants/shortcutStyle";
import buildcss from "../build.css?raw";

window.feedbackConfig = {
  theme: "ORANGE",
  title: "Geri Bildiriminiz Bizim için Çok Değerli",
  desc: "Sizlerin görüşleri bizim için çok önemli! Ürün ve hizmetlerimizi daha iyi hale getirebilmemiz için düşüncelerinizi paylaşırsanız çok seviniriz.",
  minimizeTitle: "Şimdi Değil",
  submitTitle: "Görüş Bildir",
  minimizeIconURL: "https://cdn-icons-png.flaticon.com/512/4658/4658825.png",
  api: {
    endpoint: "",
    token: "",
  },
  modal: {
    title: "Görüş Bildirme Formu",
    saveTitle: "Kaydet",
    closeTitle: "Kapat",
    thanksMessage:
      "Teşekkür ederiz! Görüşleriniz bizim için çok değerli. Sunduğunuz geri bildirimle daha iyi bir deneyim sunmak için çalışmaya devam edeceğiz.",
  },
};

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
