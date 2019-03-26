module.exports = {
  presets: ["@vue/app"],
  plugins: [["component", 
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ],["dynamic-import-node",{
    "noInterop":true
  }]]
};
