# Slide 1 — Cover

## Title

## TRENDORA

### Subtitle

**A Modern Full-Stack E-Commerce Platform**

### Technology Stack

\*\* Angular 21 • ASP.NET Core Web API • SQL Server

### Footer

**Graduation Project**  
Digital Egypt Pioneers Initiative (DEPI)

### Team Members

- Mostafa Ehab
- Mohamed Ahmed Ali
- Mohamed Magdy Abdel Karim
- Ahmed Khaled Ahmed
- Mahmoud Gamal Farouk

# Slide 2 — Project Overview

## About Trendora

Trendora is a full-stack e-commerce platform that delivers a seamless online shopping experience for customers while providing administrators with a centralized dashboard to efficiently manage products, categories, brands, customers, and orders.

---

## Objectives

- Deliver a seamless online shopping experience
- Simplify product and order management
- Ensure secure authentication and authorization
- Build a scalable and maintainable system architecture

---

## Core Modules

### 🛒 Shopping Experience

- Product Catalog
- Product Details
- Shopping Cart
- Secure Checkout
- Order Tracking

### 👤 Customer Account

- Authentication
- User Profile
- Wishlist
- Order History

### ⚙️ Administration

- Dashboard
- Products
- Categories & Brands
- Customers
- Orders

# Slide 3 — Team Members & Responsibilities

## 👥 Team Members

### Mostafa Ehab

**Role:** Team Leader & Frontend Developer

**Responsibilities**

- Led project planning and team coordination
- Designed the frontend architecture
- Developed the Admin Dashboard
- Integrated Angular frontend with ASP.NET Core Web APIs

---

### Mohamed Ahmed Ali

**Role:** Frontend Developer

**Responsibilities**

- Developed the User Profile module
- Built the About and Contact pages
- Integrated frontend features with backend APIs

---

### Mohamed Magdy Abdel Karim

**Role:** Frontend Developer

**Responsibilities**

- Developed the Home page
- Built the Product Catalog and Product Details pages
- Implemented the Shopping Cart and Checkout workflow
- Integrated shopping features with backend APIs

---

### Ahmed Khaled Ahmed

**Role:** Backend Developer

**Responsibilities**

- Developed ASP.NET Core Web APIs
- Implemented Authentication & Authorization
- Built Order Management services
- Integrated payment services
- Managed application deployment

---

### Mahmoud Gamal Farouk

**Role:** Backend Developer

**Responsibilities**

- Designed the SQL Server database
- Developed Product APIs
- Developed Category APIs
- Developed Admin APIs

# Slide 4 — Project Features

## 🛒 Shopping Experience

- Home Page
- Product Catalog
- Product Details
- Search & Advanced Filtering
- Featured Products
- Shopping Cart
- Secure Checkout

---

## 👤 Customer Account

- User Registration & Login
- User Profile Management
- Wishlist
- Order History
- About Page
- Contact Page

---

## ⚙️ Administration

- Dashboard Overview
- Product Management
- Category Management
- Brand Management
- Customer Management
- Order Management

# Slide 5 — System Architecture

## Overview

Trendora follows a **Three-Tier Architecture** that separates the application into independent layers, improving scalability, maintainability, security, and code organization.

---

## 🖥️ Frontend Layer

**Technologies**

- Angular 21
- TypeScript
- Tailwind CSS
- RxJS

**Responsibilities**

- User Interface
- Client-Side Routing
- API Consumption
- Form Validation
- Responsive Design

---

## ⚙️ Backend Layer

**Technologies**

- ASP.NET Core Web API
- C#
- Dependency Injection
- JWT Authentication

**Responsibilities**

- RESTful API Endpoints
- Business Logic
- Authentication & Authorization
- Request Validation
- Exception Handling

---

## 🛢️ Database Layer

**Technology**

- Microsoft SQL Server

**Responsibilities**

- Data Storage
- Relational Data Management
- Transactions
- Data Integrity
- Referential Constraints

# Slide 6 — UI/UX Strategy

## Design Philosophy

The UI/UX was designed to provide a modern, intuitive, and responsive shopping experience while maintaining consistency across all customer and admin interfaces.

---

## Design Approach

- Started with a professional e-commerce template
- Customized layouts to match project requirements
- Enhanced the interface using Google Stitch
- Built reusable UI components for consistency
- Established a unified design system

---

## Design Principles

- User-Centered Design
- Responsive Layout
- Consistent Visual Identity
- Simplicity & Accessibility
- Reusable Components
- Performance-Oriented Interface

---
# Slide 7 — Frontend Architecture

## Overview

The frontend is built with **Angular 21** using a **feature-shared-core architecture**. Each business feature is organized into its own directory, while shared functionality and application-wide services are centralized to improve maintainability, scalability, and code reusability.

---

## Project Structure

### 📦 Features

Contains the application's business domains.

- Authentication
- Products
- Shopping Cart
- Checkout
- User Profile
- Admin Dashboard

Each feature includes its own:
- Pages (Standalone Components)
- Routing
- Services
- Models
- Forms

---

### 🔄 Shared

Reusable resources used across multiple features.

- Shared Components
- Custom Pipes
- Directives
- Models & Interfaces
- Utility Functions
- Shared Constants

---

### ⚙️ Core

Application-wide singleton services and configuration.

- HTTP Services
- Authentication Service
- Route Guards
- HTTP Interceptors
- API Configuration
- Global Error Handling

---

## Angular Technologies

- Standalone Components
- Lazy Loading
- Dependency Injection
- Reactive Forms
- RxJS
- Signals
- Angular Router

---

# Slide 8 — Frontend: Admin Dashboard

## Overview

The Admin Dashboard provides administrators with a centralized interface to efficiently manage the entire e-commerce platform through secure, responsive, and user-friendly management tools.

---

## Core Modules

### 📊 Dashboard

- Business Statistics
- Sales Overview
- Quick Insights

### 📦 Product Management

- Add, Edit & Delete Products
- Product Image Upload
- Search & Pagination

### 🗂️ Category & Brand Management

- Manage Categories
- Manage Brands
- CRUD Operations

### 👥 Customer Management

- View Customer Accounts
- Search Customers
- Manage Customer Information

### 📋 Order Management

- View Orders
- Update Order Status
- Track Customer Orders

---

# Slide 9 — Frontend: Customer & contact & about

## Overview

The Customer Experience module provides users with a seamless journey from account creation to managing their profile, orders, and favorite products through an intuitive and responsive interface.

---

## Core Modules

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Route Protection

### 👤 User Profile

- View & Edit Personal Information
- Manage Shipping Addresses
- Account Settings


### 📦 Order History

- View Previous Orders
- Track Order Status
- Order Details

---
# Slide 10 — Frontend: Shopping Experience

## Overview

The Shopping Experience module delivers a complete and intuitive purchasing journey, allowing customers to discover products, manage their cart, and complete orders efficiently.

---

## Core Modules

### 🏠 Home

- Featured Products
- Categories & Brands
- Promotional Sections
- Personalized Recommendations

### 🛍️ Product Catalog

- Product Listing
- Product Details
- Search & Filtering
- Sorting
- Pagination

### 🛒 Shopping Cart

- Add & Remove Products
- Update Quantities
- Price Calculation
- Order Summary

### 💳 Checkout

- Shipping Information
- Address Selection
- Order Review
- Secure Order Placement

---

# Slide 11 — Backend Architecture

## Overview

The backend is built using **ASP.NET Core Web API** following a **layered architecture** that separates business logic, data access, and API endpoints to ensure scalability, maintainability, and clean code practices.

---

## Architecture Layers

### 🌐 API Layer

- RESTful API Endpoints
- Request Routing
- Model Binding
- Response Handling

### ⚙️ Business Layer

- Business Logic
- Validation
- Authentication & Authorization
- Order Processing

### 🗄️ Data Access Layer

- Entity Framework Core
- LINQ Queries
- CRUD Operations
- Repository Pattern

### 🛢️ Database Layer

- Microsoft SQL Server
- Relational Database Design
- Transactions
- Data Integrity

---

## Backend Technologies

- ASP.NET Core Web API
- C#
- Entity Framework Core
- SQL Server
- JWT Authentication
- Dependency Injection

---

## Engineering Principles

- Layered Architecture
- Separation of Concerns
- Dependency Injection
- RESTful API Design
- Secure Authentication & Authorization
- Scalable & Maintainable Codebase
# Slide 12 — Database Design

## Overview

The database is designed using a **relational model** in **Microsoft SQL Server** to ensure data consistency, integrity, and efficient management of the e-commerce platform.

---

## Core Entities

### 👤 User Management

- Users
- Roles
- Addresses

### 🛍️ Product Catalog

- Products
- Categories
- Brands
- Product Images

### 🛒 Shopping

- Shopping Cart
- Cart Items
- Wishlist

### 📦 Order Management

- Orders
- Order Items
- Payments

---

## Database Relationships

- One-to-One Relationships
- One-to-Many Relationships
- Many-to-Many Relationships
- Foreign Key Constraints
- Cascading Operations

---

## Database Features

- Primary & Foreign Keys
- Data Normalization
- Referential Integrity
- Indexed Queries
- Transaction Management
- Optimized Data Retrieval

---

## Technologies

- Microsoft SQL Server
- Entity Framework Core
- LINQ
- Migrations

# Slide 13 — Backend: Authentication & Admin Services

## Overview

The backend provides secure authentication and comprehensive administrative services through RESTful APIs, enabling role-based access control and efficient management of the e-commerce platform.

---

## Authentication & Authorization

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing
- Refresh Token Support

### 🛡️ Authorization

- Role-Based Access Control (RBAC)
- Protected API Endpoints
- Policy-Based Authorization
- Secure Resource Access

---

## Admin Services

### 📦 Product Management

- Product CRUD Operations
- Product Image Management

### 🗂️ Category & Brand Management

- Category CRUD
- Brand CRUD

### 👥 Customer Management

- Customer Management APIs
- User Information Management

### 📋 Order Management

- Order Processing
- Order Status Updates
- Order Tracking

---

## Backend Features

- RESTful API Design
- Dependency Injection
- Request Validation
- Global Exception Handling
- Standardized API Responses
- Secure Endpoint Protection

---

## Technologies

- ASP.NET Core Web API
- JWT Authentication
- Entity Framework Core
- SQL Server
- LINQ

# Slide 14 — Backend: Product, Order & Customer Services

## Overview

The backend exposes RESTful APIs that power the shopping experience by managing products, customer accounts, shopping carts, orders, and checkout processes.

---

## 🛍️ Product Services

- Product CRUD Operations
- Category & Brand Management
- Product Search & Filtering
- Pagination
- Product Image Management

---

## 🛒 Shopping Cart Services

- Add & Remove Cart Items
- Update Product Quantities
- Calculate Cart Totals
- Manage Customer Cart

---

## 💳 Order & Checkout Services

- Order Creation
- Shipping Information
- Payment Processing
- Order Confirmation
- Order Status Management

---

## 👤 Customer Services

- User Profile Management
- Address Management
- Wishlist
- Order History
- Order Tracking

---

## Backend Features

- RESTful API Design
- Business Logic Layer
- Entity Framework Core
- SQL Server Integration
- Request Validation
- Secure Data Access
- Error Handling
- Dependency Injection

---

## Technologies

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- LINQ
- JWT Authentication
# Slide 15 — Challenges & Solutions

## Overview

Throughout the development of Trendora, several technical challenges were encountered across both the frontend and backend. These were addressed using modern frameworks, architectural patterns, and best practices.

| Challenge | Solution |
|-----------|----------|
| API Integration | Service-Based Architecture with Angular HttpClient |
| Authentication & Authorization | JWT Authentication with Role-Based Access Control |
| State Synchronization | Angular Signals & RxJS Reactive Programming |
| Responsive User Interface | Tailwind CSS & PrimeNG Components |
| Code Organization | Feature-Based Angular Architecture |
| Route Protection | Angular Route Guards & HTTP Interceptors |
| Database Relationships | Entity Framework Core & SQL Server |
| Form Validation | Angular Reactive Forms with Custom Validators |
| Performance Optimization | Lazy Loading & Standalone Components |
| Error Handling | Global Exception Handling & HTTP Interceptors |
# Slide 16 — Future Enhancements

## Overview

Trendora is designed with scalability in mind, allowing future features and technologies to be integrated without major architectural changes.

---

## 🚀 Planned Enhancements

### 🤖 AI-Powered Features

- Personalized Product Recommendations
- AI Shopping Assistant (Chatbot)
- Product Review Analysis

---

### 📱 Mobile Application

- Native Android & iOS Applications
- Cross-Platform User Experience

---

### 💳 Payment & Checkout

- Multiple Payment Gateways
- Digital Wallet Integration
- Saved Payment Methods

---

### 🔔 Customer Engagement

- Push Notifications
- Email Notifications
- Order Status Alerts

---

### 📊 Business Intelligence

- Advanced Analytics Dashboard
- Sales Reports
- Customer Behavior Analysis

---

### 🌍 Platform Expansion

- Multi-Language Support
- Multi-Currency Support
- International Shipping
- Multi-Vendor Marketplace
# Slide 18 — Thank You

## **THANK YOU**

### Questions?

---

## Team

**Trendora**  
A Modern Full-Stack E-Commerce Platform

Developed as part of the **Digital Egypt Pioneers Initiative (DEPI)** Graduation Project.

---

### Technologies

Angular 20 • ASP.NET Core Web API • Entity Framework Core • SQL Server

---

### Thank You for Your Time & Attention