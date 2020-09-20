/**
 Semi Global Variables, may not be available to other classes or methods not contained in this file
 https://developers.google.com/apps-script/guides/v8-runtime/migration#adjust_handling_of_global_this
 for more details
 **/
const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
const activeSheet = SpreadsheetApp.getActiveSpreadsheet();

/**
 Test getting config from spreadhseet and getting access token from Stream Instance
 **/
function uploadUsers(){
  const config = new Config(spreadsheetId).values;
  const util = new NovoUtils(config);
  const newUsers = util.newUsers;

  const iar = new InfernoAR(config);

  newUsers.forEach( (newUser) => {addUser(newUser, iar) } );
}

function addUser(newUser, iar) {
  const user = iar.addUser(newUser);
  console.log('added/updated user', user);

  const groups = iar.updateUserGroups(user, newUser.groupName);
  console.log('added/updated groups', groups);

  const profile = iar.addProfile(user.id, newUser);
  console.log('added/update profile', profile);

  if (profile.id) {
    const image = iar.addProfileImage(user.id, newUser);
    console.log('updated image', image);
  }

}
