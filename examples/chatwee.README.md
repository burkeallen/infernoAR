# ChatWee Widget

The ChatWee Widget will include an interactive chat bubble in the bottom right corner of the browser. When users log into Inferno, they will automatically be logged into the chat. The chat runs on Chatwee and will require access to the Chatwee account for full setup.

## Instructions

### Setup

1. Copy and paste all of the code included in the chat-original.html file at the bottom of any landing page.

2. Within the variable `chatweeValues`, update the following values, found in the Integration page in Chatwee:
   a. `chatId: "5f47b04141f1d417ef0ef4d2"`
   b. `clientApiKey: “675fa0c0c93c392957625bde”`
   c. `sessionCookieKey: "chatwee-SID-5f47b04141f1d417ef0ef4d2"`

3. Be sure to include the chat code in every landing page. If the user reloads on a page that does not include the chat, the chat bubble will not appear until they return to a page that includes it.

### Triggering Conversations

The chat code includes a function to trigger private conversations with any other user in the chat from the landing page. Follow these steps:

1. Add `triggerConversation(event)` to the `onclick` attribute of the button element you would like to serve as trigger.

2. Add the chat ID of the target user to the `id` attribute of the button element. Getting the chat id of the target user is a bit of work. You can find the id by going into the Community page of the Chatwee dashboard and deactivating and reactivating that user. Then go into the Network tab and find the call to activate that user. The URL looks something like: https://client.chatwee.com/community/users-activate?users%5B%5D=5f6e489626bac60277bd85cf. The final parameter, that string of numbers and letters, is the id you'll need. This requires that the target user, for example a booth attendant, must log in before the conference starts, so the landing page can be updated in time.

You can find an example in "attendee list test.html". The button and its onclick attribute are set at line 917. The chat ID is defined at lines 1055, 1069, 1083, 1097, and set at line 1142.

### Customization

1. You can change all colours of the chat widget, as well as implement any custom CSS, from the Appearance page in Chatwee.

2. The chat-styling.css file is used to hide any Chatwee branding.

3. The Customize page in Chatwee allows for further customizing the widget
   a. To embed the chat instead of presenting a floating bubble, follow the instructions here: https://chatwee.com/chat-display-modes and make the changes under Desktop display.
   b. Ensure that Login methods under Access are only set to Chatwee, so that users can only log in via the automatic process on arriving in Inferno. Turn off Facebook and Guests. Also set the chat to display only for logged in users. This will ensure users can only enter the chat via our integration with Inferno.

### Replacement Widget

1. We will be replacing the chat bubble with custom styling. The chat-custom.html file is the beginning of this. It pulls styles from the chat-replacement-styling.css file, also found on the Studio304 server, and includes additional templating and scripting code to display our own custom bubble. This feature is still in progress. Please use the chat-original.html file for now.
