export const truncateText = (text: string) => {
  const words = text.split('');
  const truncatedWords = words.slice(0, 35);
  const truncatedText = truncatedWords.join('');

  if (words.length > 10) {
    return truncatedText + '...';
  } else {
    return truncatedText;
  }
};
