## Setup and Running Instructions

1. **Navigate to the project directory**:

   ```bash
   cd splunk
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Run tests**:
   ```bash
   npm test
   ```

**Important**: Make sure to run all commands from within the `splunk` directory, not the root directory.

## Implementation Summary

### Project Structure

- **Components**: Modular React components built with TypeScript and Material-UI
  - `ConfigurationForm`: Handles user input for hardware configurations
  - `ResultsDisplay`: Displays server model options based on input
- **Utilities**:
  - `memoryValidation.ts`: Validates memory input according to requirements
  - `serverModelSelection.ts`: Implements logic for determining available server models

### Key Technical Decisions

1. **Form Validation**:

   - Implemented live validation for memory input with specific error messages
   - Enforced comma-separated integer format as required
   - Added proper validation for multiple of 1024 and power of 2 constraints

2. **Server Model Selection Logic**:

   - Created a rule-based system that accurately maps configurations to appropriate server models
   - Implemented all business rules as specified in requirements
   - Designed for clear, maintainable code with strong typing

3. **User Interface**:

   - Used Material-UI components for a clean, professional appearance
   - Responsive design that works well on different screen sizes
   - Clear error messaging and intuitive form layout

4. **Testing Strategy**:
   - Unit tests for all critical validation and selection logic
   - Component tests to ensure proper rendering
   - Test cases covering all examples and edge cases from requirements
