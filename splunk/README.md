# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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
