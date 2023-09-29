type Tag = {
  tag: string;
  position: number;
}
export const validateTags = (input: string): string => {
  if (!input) return null;

  const regex = /<\/?[A-Z]>/g;
  const tags = [...input.matchAll(regex)];
  const stack: Tag[] = [];

  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i][0];
    let position = tags[i].index as number;

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
      let lastOpeningTag = stack[stack.length - 1];
      if (lastOpeningTag.tag[1] !== tag[2]) {
        return `Expected </${lastOpeningTag.tag[1]}> found ${tag}`;
      }

      // Otherwise, everything's good, we can remove the last opening tag from the stack
      stack.pop();
    }
  }

  if (stack.length) {
    // We have an unmatched opening tag
    return `Expected </${stack[stack.length - 1].tag[1]}> found #`;
  }

  return "Correctly tagged paragraph";
}
