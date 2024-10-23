E-Commerce Application

Overview

This project is an e-commerce application that showcases products in four main categories: Jewelry, Mens's Clothing, Female's clothing and Electronics. Built using Next.js, TypeScript, and Tailwind CSS, the application employs Redux for state management to ensure a seamless user experience.

Project Structure
The project structure is organized as follows:

Technologies Used

Next.js: For server-side rendering and routing
TypeScript: For type safety and improved developer experience
Tailwind CSS: For styling and responsive design
Redux: For state management
Axios: For API calls

Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (version 14 or higher)
npm 
Installation
Clone the repository:

git clone https://github.com/nicojoy-gif/farmily-product.git
cd farmily-product
Install dependencies:

npm install

Running the Application
Start the development server:

npm run dev

Open your browser and navigate to http://localhost:3000 to view the application.

Design Choices
Component-Based Architecture: The application uses a component-based architecture to promote reusability and maintainability. Each UI element is built as a reusable component.

Redux for State Management: Redux is utilized to manage the global state, allowing easy access to shared data such as product categories and user information across components.

Responsive Design: Tailwind CSS is used for responsive design, ensuring a consistent look and feel across devices. The utility-first approach allows for rapid styling and layout adjustments.

Type Safety with TypeScript: TypeScript enhances code quality by catching errors during development, improving the overall robustness of the application.

Async Thunks for API Calls: Async thunks are implemented for fetching data, ensuring a clear separation of concerns between UI and data fetching logic.

Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements!

License
This project is licensed under the MIT License - see the LICENSE file for details.