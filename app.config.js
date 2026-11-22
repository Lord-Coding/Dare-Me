const variant = process.env.APP_VARIANT ?? "development";

const getUniqueIdentifier = () => {
  switch (variant) {
    case "production":
      return "com.lordsama.dareme";

    case "preview":
      return "com.dareme.preview";

    default:
      return "com.dareme.dev";
  }
};

const getAppName = () => {
  switch (variant) {
    case "production":
      return "DareMe";

    case "preview":
      return "DareMe Preview";

    default:
      return "DareMe Dev";
  }
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});