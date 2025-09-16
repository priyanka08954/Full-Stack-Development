DreamLens Photography Website
Project Overview

DreamLens Photography is a dynamic website designed to showcase photography work and allow users to book photography sessions online. The website includes a responsive gallery and a booking form, with all booking data stored in a SQLite database for interactive functionality.

Features

Responsive gallery displaying multiple categories of photography, including Wedding, Nature, Fashion, Events, Product, Travel, and Maternity & Baby photography.

Booking form with fields for Photography Type, Name, Email, Date, and Additional Message.

Backend API built with Node.js and Express.js for handling bookings.

SQLite database (bookings.db) stores all booking information.

Confirmation messages displayed after successful booking submissions.

Project Structure

The project consists of a Node.js backend (server.js) that serves frontend files from the public directory. The frontend includes an HTML page (index.html) and styling (style.css). The SQLite database automatically stores booking information submitted through the form.

Functionality

Users can browse the photography gallery and submit a booking request through the form. The form sends booking information to the backend API, which stores the data in the SQLite database. Users receive confirmation once the booking is saved. Administrators or developers can access all bookings via the API for review.

Future Enhancements

Make the gallery dynamic by loading images from a database or JSON file.

Implement an admin dashboard for managing bookings.

Send email notifications upon new bookings.

Integrate payment functionality for photography sessions.

