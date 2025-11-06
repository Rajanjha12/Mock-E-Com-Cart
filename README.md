# 🛒 Mock E-Commerce Cart

A simple **full-stack shopping cart application** built using React (Frontend), Node/Express (Backend), and MongoDB for storing user data and cart items. This application demonstrates basic e-commerce functionality like adding/removing products from the cart, viewing the cart, and generating invoices in PDF format.
 



### screenshots

| Screen           | Screenshot                                                                                                                                              |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Signup Page**  | ![Signup](https://github.com/user-attachments/assets/e595a3f2-c88d-439e-9413-28da72d3d69c)                                                           |
| **Login Page**   | ![Login](https://github.com/user-attachments/assets/a17dd881-78d0-41ef-9000-90cc517540ee)                                                             |
| **Home Page**    | ![Home](https://github.com/user-attachments/assets/3c259913-938f-491d-a8f6-deee71b67e76)                                                             |
| **Product Page** | ![Product](https://github.com/user-attachments/assets/bc762736-a1d9-42fa-af1c-8815dd1ac261)                                                           |
| **Cart Page**    | ![Cart](https://github.com/user-attachments/assets/f0209508-d060-4bb0-81b6-10c376bb3267)                                                              |
| **Invoice Page** | ![Invoice](https://github.com/user-attachments/assets/fb72b20e-d4d2-4335-833b-db49bdb10ff5)                                                           |





## 🚀 Features

### Frontend
- **Product Grid**: Display a list of products with "Add to Cart" functionality.
- **Cart View**: Show items, quantities, and prices in the cart.
- **Checkout**: Submit cart items to get a mock receipt.
- **Invoice Generation**: Generate a PDF invoice after successful checkout.
- **User Authentication**: Login/Signup using JWT tokens.

### Backend
- **RESTful API**: Manage products, cart items, and user authentication.
- **Cart Management**: Add/remove items, get cart data.
- **Checkout and Receipt**: Mock checkout process with a generated receipt.
- **PDF Invoice Generation**: Generate downloadable invoices using jsPDF.

---

## 🔧 Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Other**: jsPDF (for invoice generation), React Context API (for global state)

---

## 🚧 Setup Instructions

### Prerequisites

Ensure that the following are installed:
- **Node.js** (v16+)
- **npm** or **yarn**
- **MongoDB** (Local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Gyanthakur/mock-ecom-cart.git
cd mock-ecom-cart
```

### 2. Backend Setup

## 1. Navigate to the backend folder:

```bash
cd backend
```

## 2. Install backend dependencies:
```bash
    npm install
```

## 3. Create a .env file in the backend folder and add:
```bash
MONGO_URI=mongodb://localhost:27017/mock-ecom-cart
JWT_SECRET=your-secret-key
PORT=5000
```

## 4. Run the backend server:
```bash
npm start
```


Your backend will now run at ```http://localhost:5000```.


### 3. Frontend Setup

## 1. Navigate to the frontend folder:

```bash
cd ../frontend
```

## 2. Install frontend dependencies:
```bash
    npm install
```

## 3. Create a .env file in the frontend folder and add:
```bash
VITE_BACKEND_URL=http://localhost:5000
```

## 4. Run the frontend server:
```bash
npm run dev
```

Your frontend will be accessible at ```http://localhost:5173```.

📂 Project Structure
```bash
mock-ecom-cart/
├── backend/
│   ├── controllers/          # API route handlers
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── .env                 # Environment variables
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context API for global state
│   │   ├── pages/           # React pages
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point for React app
│   │   ├── utils/           # Helper functions (e.g., API requests)
│   │   ├── AppContext.jsx   # Context API provider
│   ├── .env                 # Environment variables (e.g., backend URL)
│   ├── index.html           # Main HTML file
│   └── package.json         # Frontend dependencies and scripts
└── README.md                # readme file
```


### 📝 Notes
- JWT Authentication: JWT tokens are used to manage sessions. After login, a token is saved to ```localStorage``` for persistent user sessions.

- MongoDB: MongoDB stores product data, cart items, and user information.

- Invoice Generation: After checkout, a downloadable PDF invoice is created using jsPDF.
