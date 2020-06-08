export function getStyles(colors){
  return {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: colors.background,
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    border: {
      borderWidth: 1,
    },
    roundConers: {
      none: { borderRadius: 0, },
      tiny: { borderRadius: 2.5, },
      small: { borderRadius: 5, },
      medium: { borderRadius: 10, },
      large: { borderRadius: 15, },
      round: { borderRadius: 99, },
      rounded: { borderRadius: 99, },
    },
  }
}
