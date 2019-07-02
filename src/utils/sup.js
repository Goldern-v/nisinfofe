export function formatSub(str) {
  return str
    .replace("    ", "&nbsp&nbsp")
    .replace("^2", "<sup>2</sup>")
    .replace("^3", "<sup>3</sup>")
    .replace("^4", "<sup>4</sup>")
    .replace("^5", "<sup>5</sup>")
    .replace("^6", "<sup>6</sup>")
    .replace("^7", "<sup>7</sup>")
    .replace("^8", "<sup>8</sup>")
    .replace("^9", "<sup>9</sup>");
}
