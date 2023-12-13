import { styled } from "../../styles";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 567,
  height: 656,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  // h1: {
  //   fontSize: "$xxl",
  //   color: "$gray300",
  // },

  // span: {
  //   marginTop: "1rem",
  //   display: "block",
  //   fontSize: "$xxl",
  //   color: "$green300",
  // },

  // p: {
  //   marginTop: "2.5rem",
  //   fontSize: "$md",
  //   lineHeight: 1.6,
  //   color: "$gray300",
  // },

  // button: {
  //   marginTop: "auto",
  //   backgroundColor: "$green500",
  //   border: 0,
  //   color: "$white",
  //   borderRadius: 8,
  //   padding: "1.25rem",
  //   cursor: "pointer",
  //   fontWeight: "bold",
  //   fontSize: "$md",

  //   "&:not(:disabled):hover": {
  //     backgroundColor: "$green300",
  //   },

  //   "&:disabled": {
  //     opacity: 0.6,
  //     cursor: "not-allowed",
  //   },
  // },
});

export const ProductContent = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgb(0, 0, 0, 0.6)",

    strong: {
      fontSize: "$md",
      color: "$gray100",
    },

    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300",
    },
  },
});
