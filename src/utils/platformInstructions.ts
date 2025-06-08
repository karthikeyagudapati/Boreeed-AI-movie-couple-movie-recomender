
export const getPlatformInstructions = (platformName: string): string => {
  const instructions = {
    'Netflix': 'Go to Account > Privacy > Download your information > Select "Viewing activity" > Download CSV',
    'Amazon Prime Video': 'Go to Your Account > Your Prime Video > Watch History > Export data (if available)',
    'Disney+ Hotstar': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
    'ZEE5': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
    'Voot': 'Not available - Upload Netflix CSV if you have both platforms, or manually enter titles below',
    'Hulu': 'Go to Account > Privacy and Settings > Download Your Information > Select viewing data',
    'HBO Max': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
    'Apple TV+': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
    'Paramount+': 'Not directly available - Use Netflix CSV if available, or manually enter titles',
    'Peacock': 'Not directly available - Use Netflix CSV if available, or manually enter titles'
  };
  return instructions[platformName] || 'Manual entry recommended for this platform';
};
