// slide1.bundle.tsx

/** Container style */
export const slide1Container: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: "40px",
  boxSizing: "border-box",
  background: "#ffffff", // white background
  color: "#000000", // default text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Title style */
export const title1: React.CSSProperties = {
  fontSize: "5rem", // increased font size
  fontWeight: 700,
  marginBottom: "2px",
  color: "#4e83c3", // blue
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Subtitle style */
export const subtitle1: React.CSSProperties = {
  fontSize: "1.75rem", // increased font size
  fontWeight: 400,
  color: "#000000", // keep black
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
