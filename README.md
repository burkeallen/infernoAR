# InfernoAR
Repo to house Inferno AR Code Snippets and Static Files

#Inferno CLI
https://github.com/novologic/inferno-cli

tool that lets you 
- generate local template files
- pull code snippet info from platform
- push code snippets form local template file to platform

#Resources
- user editor 
  - https://nextech-booths.s3-us-west-2.amazonaws.com/infernoar/usereditor/index.html
  - this combined with bulk user import in the platform removes the need for the google sheet script we wer using to 
import users and manage their profile data via the inferno APIs
- Static Asset Server (FTP) 
  - ec2-18-219-156-215.us-east-2.compute.amazonaws.com
  - requires sftp and key file to access
- Tool to quickly crop files to same size 
  - https://birme.net
- Free photoshop 
  -  https://www.photopea.com/
- CSS Grid Helper
  - https://grid.layoutit.com/ 
- CSV to JSON converter 
  - https://www.convertcsv.com/csv-to-json.htm
- MS Word to Clean HTML converter
  - https://www.textfixer.com/html/convert-word-to-html.php
- InfernoAR API - swagger documentation 
  - https://api.infernocore.jolokia.com/swagger/index.html
  - often find it is easier to use Browser inspector network tab to see calls, payloads, return objcts, etc.

# Lessons Learned

- sales are selling features that do not exist, use imagination to see if you can help the PM solve 
for the missing feature, even if it is not exactly like what is expected

- organize pages, and related assets into Google Sheet and share with your PM
  - example - https://docs.google.com/spreadsheets/d/1WZNX3oY9psPz3RKis34Q-qE_I5LWk9duAzIaNNkIc7s/edit?usp=sharing

- you need to manage the PM in most cases

- do not create links to other pages in the platform using Javascript, as this breaks the Angular Router SPA, 
and causes the entire app to reload in the browser

- Admins cannot edit user profile information of users in the, there is a standalone tool that is now available 
no manage user profile info like images, and profile field data
https://nextech-booths.s3-us-west-2.amazonaws.com/infernoar/usereditor/index.html

- Users, code snippets, and code snippet revisions cannot be deleted once created

- when adding a new category page, be sure to immediately add the page to the "Admin" group, otherwise 
when you try and navigate to the page, the system may log you out, just stay on the current page and not 
navigate to the intended page

- PSD files provided by "creative team" are often only suggestions, often not complete, and often require you to 
do some graphic production work to get to the actual assets needed, when possible use CSS and HTML elements instead of graphics 
from file. Majority of the time all you need is the background image out of the PSD

- try and use % for height, width, position (top,right,bottom,left) will help when left nav bar is toggled, and 
when browser window is resized

- use CSS grid when possible, Flex when necessary

- only need to worry about support modern browser (no IE 11!) - take full advantage of CSS3, HTML5

- we are developing for Laptop first, Mobile as "good enough"

- be careful of using public variables, as code does not get removed form the DOM when you navigate away from the page.
if you do use a public variable make it "var" not a let or const, as it will throw errors when returning to the page   

- understand the Shadow Dom, for category pages all code will be in a Shadow Root

- no need to worry about names for classes and styles, as each page loads into Shadow Dom, so your styles are protected
there are a few exceptions, as some of the main app styles reach "deep" into the shadow Dom.

- for long lists of items, leverage <template> and place item info into a JSON object, will save a ton of time and 
potential typos, when changing content, last minute, which can happen a lot. 

- for short list, just build out straight HTML elements

- do not wait on content, go ahead and build out pages using placeholders, thinking about how much content may exist on a page
  - agenda items, amount of descriptive text on each agenda item
  - library - PDFS, Videos, Etc.
  - Speakers - number of people, amount of bio text, etc.
  
- work with urgency not panic - try and anticipate what will be needed and get ahead of the panic that the PM and 
Client will create in last day or two before the event.

- when using the inferno API use the endpoint 

- all <a href> tags should contain a unique id="" property to help with user stats/analytics for the customer

- console.log({{data}}) to get a full output of the available liquid JSON object

- must include {{data.UserProfiles}} on the page to get this included in the liquid JSON object

- do not confuse events with events, videos with videos - the naming convention of the user interface in the platform is 
not conducive to how it is being used at the moment. 

#InfernoAR Objects/Elements
- Events in the platform are objects that can be associated with one or more category (pages)
  - can have a start date and duration which can be accessed via liquid on category pages to help you determine which 
    event is active or upcoming 
  - can contain a video
  - or a video stream
  - can also contain quizzes
  - can also contain attachments 
    - handout - can be used to allow user to download a related PDF
    - certificate - used to present a downloadable certificate to user for completing the associated quiz
- Category - a "page" in the platform that you associate events with, a page can be associated with a code snippet 
    to override the normal behavior of the page (which is to display related "events")
    - if no code snippet will simply display a grid of "Events" associated with the Category
    - Categories can be "nested"
- Videos - you can upload a video in an "Event object"
- Videos - is also the name of the menu item in the Admin panel which takes you back to the "end User" view of the system
- Users - associate users with groups to control access 
   - (Admin) gives user admin privileges
- User Profile - can only be edited/managed by logged in user, or via API, or now via user editor tool
   - if user profile record does not exist, or user has opted out "hideProfilePrivacyOptOut" = null or false
        then user will not be included in the Liquid JSON object on the pages
- Groups  - used to provide linkage between Category Pages and Users - 
- Group Registration - a semi private registration link that allows user to self register and be placed in a specific group
- Booths - not a real feature of the platform,  basically a background image with hotspots on it, 
  and or fixed position video and images, links to PDF files, popup videos, etc.
  - there is supposedly a booth generator that the customer can use to upload assets and content. It generates the code 
    that is the placed into code snippet, we have not seen this yet, and not sure how it works.
- Code Snippets - allows you to override the display and content on a given page or to manipulate other elements of the sute
  - Category Page - most often used with a code snippet to create "web pages" and platform features
     - attendees list
     - speaker list
     - expo hall
     - booths
     - agenda
     - chat rooms
     - auditorium
  - Disclaimer - have not used this ???
  - emails - basic email template (think mailchimp, but with no mail merge capability)
    - Email (Event Live) 
    - Email (Event Registration Confirmation)
    - Email (Event Upcoming)
    - Email (Group Registration Confirmation)
    - Email (Group Registration Reminder)
    - Email (VOD Available)
  - Login Page
    - create your own public login page
  - Player Page
    - used to style the page displayed when a user clicks on a link for an "event"
    - often contains the video, chat widget, 3rd party pools/surveys
  - Registration (Confirmation) - have not used yet
  - Registration (Event) - have not used yet
  - Registration (Group) - used to create a custom registration page for the semi private group registration link
    You have to code everything, field validation etc. can contain the required fields
        - first name
        - last name
        - password
        - email
        
        
- Chat
- QA - a simple input box that can be made available on a player page
   
 


