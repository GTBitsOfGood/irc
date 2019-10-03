const cardAvatarStyle = {
  cardAvatar: {
    "&$cardAvatarProfile img": {
      width: "100%",
      height: "auto"
    }
  },
  cardAvatarProfile: {
    maxWidth: "8.125rem",
    maxHeight: "8.125rem",
    margin: "-3.125rem auto 0",
    borderRadius: "50%",
    overflow: "hidden",
    padding: "0",
    boxShadow:
      "0 1rem 2.375rem -0.75rem rgba(0, 0, 0, 0.56), 0 0.25rem 1.5625rem 0rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.2)",
    "&$cardAvatarPlain": {
      marginTop: "0"
    }
  },
  cardAvatarPlain: {}
};

export default cardAvatarStyle;
