export default function truncateText(textString, len) {
  return (textString.length > len ? `${textString.substring(0, len)}...` : textString);
}
