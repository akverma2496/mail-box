export function transformEmail(email) {
  // Define the characters that need to be replaced
  const invalidChars = ['.', '$', '/', '~', '[', ']', '#', '?', '&', '=', '%', ' '];

  // Replace each invalid character with an underscore (_)
  let transformedEmail = email;

  if (transformedEmail) {
    invalidChars.forEach(char => {
      const regex = new RegExp(`\\${char}`, 'g');  // Escape the character and create a regex
      transformedEmail = transformedEmail.replace(regex, '_');
    });
  }

  return transformedEmail;
}

