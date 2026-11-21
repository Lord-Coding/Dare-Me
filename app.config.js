const variant = process.env.APP_VARIANT ?? "development";

const getUniqueIdentifier = () => {
  switch (variant) {
    case "production":
      return "com.dareme.app";

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

export default {
  expo: {
    name: getAppName(),
    slug: "dareme",

    extra: {
      eas: {
        projectId: "b3d1bf91-3b3c-4383-a022-1dfbae517bfc",
      },
    },

    android: {
      package: "com.lordsama.dareme"
    },

    version: "1.0.0",

    orientation: "portrait",

    icon: "./assets/icon.png",

  }
}