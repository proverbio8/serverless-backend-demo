type Tag = {
  tag: string;
  position: number;
};
export const validateTags = (input: string): string => {
  if (!input) return null;

  const regex = /<\/?[a-zA-Z]*>/g;
  const tags = [...input.matchAll(regex)];

  // Check whether there are no tags in the text
  if (!tags.length) return "This text doesn't have tags";

  const stack: Tag[] = [];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i][0];

    if (/^<>$/.test(tag) || /^<\/>$/.test(tag)) {
      return '<> and </> are invalid tags';
    }

    const position = tags[i].index as number;

    // If it's an opening tag
    if (tag[1] !== '/') {
      stack.push({ tag, position });
    }

    // If it's a closing tag
    else {
      // If the stack is empty, we have an extra closing tag
      if (!stack.length) {
        return `Expected # found ${tag}`;
      }

      // If the closing tag doesn't match the most recent opening tag
      const lastOpeningTag = stack[stack.length - 1];
      const openingTagName = lastOpeningTag.tag.slice(1, lastOpeningTag.tag.length - 1);
      const closingTagName = tag.slice(2, tag.length - 1);

      if (openingTagName !== closingTagName) {
        return `Expected </${openingTagName}> found ${tag}`;
      }

      // Otherwise, everything's good, we can remove the last opening tag from the stack
      stack.pop();
    }
  }

  if (stack.length) {
    // We have an unmatched opening tag
    const remainderOpeningTag = stack[stack.length - 1];
    const remainderOpeningTagName = remainderOpeningTag.tag.slice(1, remainderOpeningTag.tag.length - 1);
    return `Expected </${remainderOpeningTagName}> found #`;
  }

  return 'Correctly tagged paragraph';
};
