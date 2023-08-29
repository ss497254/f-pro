import { defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import presetAutoprefix from "@twind/preset-autoprefix";

export default defineConfig({
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    {
      theme: {
        spacing: {
          0: "0px",
          px: "1.25px",
          0.5: "2.5px",
          1: "5px",
          1.5: "7.5px",
          2: "10px",
          2.5: "12.5px",
          3: "15px",
          3.5: "17.5px",
          4: "20px",
          5: "25px",
          6: "30px",
          7: "35px",
          8: "40px",
          9: "45px",
          10: "50px",
          11: "55px",
          12: "60px",
          14: "70px",
          16: "80px",
          20: "100px",
          24: "120px",
          28: "140px",
          32: "160px",
          36: "180px",
          40: "200px",
          44: "220px",
          48: "240px",
          52: "260px",
          56: "280px",
          60: "300px",
          64: "320px",
          72: "360px",
          80: "400px",
          96: "480px",
        },
      },
    },
  ],
});

