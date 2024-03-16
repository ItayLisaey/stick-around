const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#261c2c",
    background: "#bdd3ff",
    lightBackground: "#584563",

    tint: "#261c2c",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    tabBarBackground: "#1d1522",
    indicator: {
      negative: "hsla(0, 84%, 64%, 1)",
      positive: "#4aa96c",
      neutral: "#6e85b2",
    },
  },
  dark: {
    text: "#bdd3ff",
    background: "#261c2c",
    lightBackground: "#584563",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    tabBarBackground: "#1d1522",
    indicator: {
      negative: "hsla(0, 84%, 64%, 1)",
      positive: "#4aa96c",
      neutral: "#6e85b2",
    },
  },
};
