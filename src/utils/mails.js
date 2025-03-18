import jwt from 'jsonwebtoken'

const verificationMailHTML = (name, email, dateOfBirth, gender, phoneNumber, rollNo, department, degree, password) => `
    <html lang="en">
    <head>
      <style>
        /* Global Styles */
        body {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0;
          padding: 0;
          background-color:rgb(190, 186, 186);
        }
          
        a {
            text-decoration: none;
        }


        table {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-spacing: 0;
          border-radius: 8px;
        }

        /* Header Styles */
        .header {
          background-color: #007bff;
          color: rgb(0, 0, 0);
          padding: 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          font-size: 40px;
          font-weight: bold;
        }

        /* Body Styles */
        .content {
          padding: 20px;
          text-align: center;
        }

        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 15px;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
        }

        /* Button Styles */
        .button {
          background-color: #007bff;
          color: black;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          font-size: 20px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 20px;
        }

        .button:hover {
          background-color:rgb(23, 101, 185);
        }

      </style>
    </head>
    <body>
      <table>
        <!-- Header Section -->
        <tr>
          <td class="header">
            Library, IIT Ropar
          </td>
        </tr>

        <!-- Body Section -->
        <tr style="background-color:rgb(212, 206, 206);">
          <td class="content">
            <h1>Click the button below to verify your mail</h1>
            <p>Dear ${name},</p>
            <p>We got a request from you to get registered for IIT Ropar library services. To continue your registration please click the link below to verify your email id</p>
            <a href="http://localhost:3000/api/v1/students/verify-email?token=${jwt.sign({ name, email, dateOfBirth, gender, phoneNumber, rollNo, department, degree, password }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1h' })}" class="button" target="_blank" style="color: black; text-decoration: none;">Verify mail</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
`

const resetPasswordMailHTML = (email, name) => `
    <html lang="en">
    <head>
      <style>
        /* Global Styles */
        body {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0;
          padding: 0;
          background-color:rgb(190, 186, 186);
        }
          
        a {
            text-decoration: none;
        }


        table {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-spacing: 0;
          border-radius: 8px;
        }

        /* Header Styles */
        .header {
          background-color: #007bff;
          color: rgb(0, 0, 0);
          padding: 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          font-size: 40px;
          font-weight: bold;
        }

        /* Body Styles */
        .content {
          padding: 20px;
          text-align: center;
        }

        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 15px;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
        }

        /* Button Styles */
        .button {
          background-color: #007bff;
          color: black;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          font-size: 20px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 20px;
        }

        .button:hover {
          background-color:rgb(23, 101, 185);
        }

      </style>
    </head>
    <body >
      <table>
        <!-- Header Section -->
        <tr>
          <td class="header">
            Library, IIT Ropar
          </td>
        </tr>

        <!-- Body Section -->
        <tr style="background-color:rgb(212, 206, 206);">
          <td class="content">
            <h1>Click the button below to reset your password</h1>
            <p>Dear ${name},</p>
            <p>We got a request from you to reset your password for IIT Ropar library services. Please click the link below to reset your password</p>
            <a href="${process.env.Frontend_URL}/reset-password?token=${jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, { expiresIn: '1h' })}" class="button" target="_blank" style="color: black; text-decoration: none;">Reset password</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
`

const approvedRegistrationMailHTML = (name) => `
    <html lang="en">
    <head>
      <style>
        /* Global Styles */
        body {
          font-family: Arial, sans-serif;
          color: #333;
          margin: 0;
          padding: 0;
          background-color:rgb(190, 186, 186);
        }
          
        a {
            text-decoration: none;
        }


        table {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-spacing: 0;
          border-radius: 8px;
        }

        /* Header Styles */
        .header {
          background-color: #007bff;
          color: rgb(0, 0, 0);
          padding: 20px;
          text-align: center;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          font-size: 40px;
          font-weight: bold;
        }

        /* Body Styles */
        .content {
          padding: 20px;
          text-align: center;
        }

        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 15px;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
        }

        /* Button Styles */
        .button {
          background-color: #007bff;
          color: black;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          font-size: 20px;
          border-radius: 10px;
          display: inline-block;
          margin-top: 20px;
        }

        .button:hover {
          background-color:rgb(23, 101, 185);
        }

      </style>
    </head>
    <body >
      <table>
        <!-- Header Section -->
        <tr>
          <td class="header">
            Library, IIT Ropar
          </td>
        </tr>

        <!-- Body Section -->
        <tr style="background-color:rgb(212, 206, 206);">
          <td class="content">
            <h1>You account has been verified</h1>
            <p>Dear ${name},</p>
            <p>Your account for IIT Ropar library services has been successfully verified. You can now login to your account. You can click the below button to go to the library website.</p>
            <a href="${process.env.Frontend_URL}/login.html" class="button" target="_blank" style="color: black; text-decoration: none;">Login</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
        `

const rejectedRegistrationMailHTML = (name) => `
        <html lang="en">
        <head>
          <style>
            /* Global Styles */
            body {
              font-family: Arial, sans-serif;
              color: #333;
              margin: 0;
              padding: 0;
              background-color:rgb(190, 186, 186);
            }
              
            a {
                text-decoration: none;
            }
    
    
            table {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-spacing: 0;
              border-radius: 8px;
            }
    
            /* Header Styles */
            .header {
              background-color: #007bff;
              color: rgb(0, 0, 0);
              padding: 20px;
              text-align: center;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              font-size: 40px;
              font-weight: bold;
            }
    
            /* Body Styles */
            .content {
              padding: 20px;
              text-align: center;
            }
    
            h1 {
              color: #333;
              font-size: 24px;
              margin-bottom: 15px;
            }
    
            p {
              font-size: 16px;
              line-height: 1.5;
            }
    
            /* Button Styles */
            .button {
              background-color: #007bff;
              color: black;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              font-size: 20px;
              border-radius: 10px;
              display: inline-block;
              margin-top: 20px;
            }
    
            .button:hover {
              background-color:rgb(23, 101, 185);
            }
    
          </style>
        </head>
        <body >
          <table>
            <!-- Header Section -->
            <tr>
              <td class="header">
                Library, IIT Ropar
              </td>
            </tr>
    
            <!-- Body Section -->
            <tr style="background-color:rgb(212, 206, 206);">
              <td class="content">
                <h1>You account details could not be verified</h1>
                <p>Dear ${name},</p>
                <p>Your account for IIT Ropar library services has not been verified. You can again try to register with correct details. To register again click the button below.</p>
                <a href="${process.env.Frontend_URL}/register.html" class="button" target="_blank" style="color: black; text-decoration: none;">Register</a>
              </td>
            </tr>
          </table>
        </body>
        </html>
            `


const bookBookedMailHTML = (name, title, author, bookingDate, dueDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book has been booked by you from the library website:</p>
        <p>You can come to the library to issue(check out) this book</p>
        <p>Make sure to issue the book within 2 days of booking to avoid any fines</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Due Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${bookingDate}</td>
                <td>${dueDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const cancelBookBookingMailHTML = (name, title, author) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book's booking has been cancelled by you from the library website:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const issuedBookMailHTML = (name, title, author, bookingDate, dueDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book has been issued (checked out) from the library:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Due Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${bookingDate}</td>
                <td>${dueDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const rejectIssueBookMailHTML = (name, title, author) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book's booking has been rejected by the library:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const returnBookMailHTML = (name, title, author, returnDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book has been returned (checked in) to the library:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Return Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${returnDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const renewBookMailHTML = (name, title, author, bookingDate, dueDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book has been renewed on your library account:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Due Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${bookingDate}</td>
                <td>${dueDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const advanceBookDueDateReminderMailHTML = (name, title, author, dueDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book issued to you will be due soon.</p>
        <p>Please consider either renewing or returning the same to the library.</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Due Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${dueDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const bookDueDateReminderMailHTML = (name, title, author, dueDate) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book(s) are due on your library account </p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Due Date</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${dueDate}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>

`

const seatBookedMailHTML = (name, startTime, endTime, seatNumber, seatType, floor) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following seat has been booked by you in the library:</p>

        <table border="1" cellpadding="10">
            <tr>
                <th style="white-space: nowrap;">Seat Type</th>
                <th style="white-space: nowrap;">Seat Number</th>
                <th>Floor</th>
                <th>From</th>
                <th>To</th>
            </tr>
            <tr>
                <td style="text-align: center;">${seatType}</td>
                <td style="text-align: center;">${seatNumber}</td>
                <td style="text-align: center;">${floor}</td>
                <td>${startTime}</td>
                <td>${endTime}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const cancelSeatBookingMailHTML = (name, startTime, endTime, seatNumber, seatType, floor) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following seat's booking in the library has been cancelled by you.</p>

        <table border="1" cellpadding="10">
            <tr>
                <th style="white-space: nowrap;">Seat Type</th>
                <th style="white-space: nowrap;">Seat Number</th>
                <th>Floor</th>
                <th>From</th>
                <th>To</th>
            </tr>
            <tr>
                <td style="text-align: center;">${seatType}</td>
                <td style="text-align: center;">${seatNumber}</td>
                <td style="text-align: center;">${floor}</td>
                <td>${startTime}</td>
                <td>${endTime}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const rejectSeatBookingMailHTML = (name, startTime, endTime, seatNumber, seatType, floor) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following seat's booking in the library has been rejected by the admin.</p>

        <table border="1" cellpadding="10">
            <tr>
                <th style="white-space: nowrap;">Seat Type</th>
                <th style="white-space: nowrap;">Seat Number</th>
                <th>Floor</th>
                <th>From</th>
                <th>To</th>
            </tr>
            <tr>
                <td style="text-align: center;">${seatType}</td>
                <td style="text-align: center;">${seatNumber}</td>
                <td style="text-align: center;">${floor}</td>
                <td>${startTime}</td>
                <td>${endTime}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const bookOverdueFineMailHTML = (name, title, author, dueDate, fineAmount) => `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fine</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book issued to you is overdue on your library account and you have been fined for that.</p>
        <p>Please return the book to avoid any further fines.</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Due Date</th>
                <th>Fine Amount</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${dueDate}</td>
                <td>${fineAmount}</td>
            </tr>
        </table>

        <p> <b> Note: Books returned later beyond due date get overdue fine. An overdue fine is calculated at Rs. 2 per day for 1st week, Rs. 4 per day for 2nd week, Rs. 8 per day for 3rd week so on and so forth. Therefore, avoid overdue fine by renewing or returning the book to the library before the due date. In case of any query or doubts, reply to this email as early as possible. </b> </p>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>
    </body>
    </html>
`

const cancelNotIssuedBookBookingMailHTML = (name, title, author, fineAmount) => `

    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Book Checkout Notification</title>
    </head>
    <body>
        <p>Dear ${name},</p>

        <p>The following book's booking has been cancelled by the library:</p>
        <p>Since the book was not issued within 2 days of booking, you have been fined for the same.</p>

        <table border="1" cellpadding="10">
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Fine Amount</th>
            </tr>
            <tr>
                <td>${title}</td>
                <td>${author}</td>
                <td>${fineAmount}</td>
            </tr>
        </table>

        <p>Thank you</p>
        <p>Library, IIT Ropar</p>

`


export {
    verificationMailHTML, 
    resetPasswordMailHTML, 
    approvedRegistrationMailHTML, 
    rejectedRegistrationMailHTML, 
    bookBookedMailHTML, 
    cancelBookBookingMailHTML, 
    issuedBookMailHTML, 
    rejectIssueBookMailHTML, 
    returnBookMailHTML, 
    renewBookMailHTML,
    advanceBookDueDateReminderMailHTML,
    bookDueDateReminderMailHTML,
    seatBookedMailHTML,
    cancelSeatBookingMailHTML,
    rejectSeatBookingMailHTML,
    bookOverdueFineMailHTML,
    cancelNotIssuedBookBookingMailHTML
}