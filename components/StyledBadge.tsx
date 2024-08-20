import { styled } from "@nextui-org/react";

// Badge component will be available as part of the core library soon
export const StatusBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$2 $3",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  variants: {
    type: {
      online: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      offline: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "online",
  },
});

export const RegBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$2 $3",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  variants: {
    type: {
      pccclient: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      manual: {
        bg: "$warningLight",
        color: "$warningLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "pccclient",
  },
});
