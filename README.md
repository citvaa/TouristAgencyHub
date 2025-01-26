# TouristAgencyHub

## Project Description

The project consists of the frontend for a web application that consolidates travel agencies. The site design is flexible but adheres to the guidelines from the lectures and exercises.

Technologies used for the project include:
- HTML 5
- CSS
- JavaScript / jQuery
- Bootstrap

The specification and implementation of the layout of elements and content on the pages provide users with easy access to information and the ability to perform targeted activities. The basic layout of key elements (logo, header, main navigation, forms, etc.) is consistent across all pages of the site.

## Set of Pages

1. **Home Page**: Displays a list of all travel agencies in the system.
2. **Travel Agency Details Page**: Shows information about a specific travel agency.
3. **Destination Details Page**: Shows information about a specific destination within a travel agency.
4. **Destination Edit Page**: A form for editing the details of a destination, pre-filled with existing data.
5. **Admin Page for Agencies**: Allows the admin to review, edit, and delete travel agencies.
6. **Admin Page for Users**: Allows the admin to review, edit, and delete registered users.
7. **Login and Registration Sections**: Displayed as "pop-up" sections available on all pages.
8. **Error Pages**: Displayed in case of errors.

## Entities

**Travel Agency**:
- Name, Address, Year of establishment, Logo, Phone number, Email address, Destinations

**Destination**:
- Name, Description, Photos, Type, Mode of Transport, Ticket Price, Maximum number of people

**User**:
- Username, Password, First Name, Last Name, Email address, Date of Birth, Address, Phone number

## Notes

1. **Responsive Design**: All pages are designed according to responsive design principles.
2. **Validation and Confirmation Dialogs**: Form validation on the client side and confirmation dialogs for destructive actions.
3. **Access Rights**: All users have access to all pages.
4. **Firebase Database**: Display of data from the Google Firebase database.

