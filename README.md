# Hive Quality Assurance Test Plan

## Objectives
The objective of these tests is to ensure a smooth join flow for brand new users to increase user retention rates, as well as ensure that there are no major bugs in the registration form. 

## Scope
These set of tests are limitted to the scope of the registration/sign-in process. Anything after initial sign-up is not included.

## Assumptions
Tests assume that all pop-ups in the log-in page, registration page, and storage options page (e.g Google, Slack, Dropbox, and Box) have been correctly integrated in that after logging in with each respective account, the process continues smoothly without any bugs. It also assumes that if one of the organization size buttons can be pressed, the other two also works and that if one item can be filled out in the Hive action list and invitation page, then the other two items can also be filled out. Finally, it also assumes that if the user can back out on one page, the same button works on the rest of the pages.

## Test Approach
We conduct four main tests:
1. Test that the log-in page loads correctly using staging.hive.com
2. Test that users can join as a new user if they do not have an account already, but skipping all optional fields. We will test filling out account details (i.e email and password), creating a workspace and naming an organization, skipping the Hive action list, skipping inviting coworkers, and skipping integrating file storage services. Then, we will log-out and attempt logging in with the freshly created log-in credentials. 
3. Test that users can join as a new user, but fill out all provided fields. Everything conducted the same as above, but all external account services (e.g Google, Slack, Dropbox) will be opened up as a pop-up just to see that they work, and the action list and inviting coworkers will be filled out. Furthermore, in this run, it will test some variations of possible invalid inputs in various fields of the registration process and log-in page.
4. Test that users can return to log-in page once starting the registration process.
5. Test that users can reset their password.

## Conclusion
Registration process overall is very smooth and I didn't spot any major bugs. One thing that caught my attention was that when filling out the phone number field in creating a new account, there wasn't any limit to the phone number format and a users can input any string into the field, including letters and symbols. Finally, when writing tests, I had to delay the driver in a couple places because the aninmation between steps of the registration process was too slow and would break if the the page did not completely load. 

## Instructions
To install dependencies: `npm i`
To start the Selenium server: `npm start`
To run the acceptance test suite: `npm test`