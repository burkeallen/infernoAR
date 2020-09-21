/**
 Semi Global Variables, may not be available to other classes or methods not contained in this file
 https://developers.google.com/apps-script/guides/v8-runtime/migration#adjust_handling_of_global_this
 for more details
 **/
const spreadsheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
const activeSheet = SpreadsheetApp.getActiveSpreadsheet();

function onOpen() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Adding Inferno AR Custom Menu', 'Status');

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Inferno AR')
    .addItem('Insert/Update Users', 'uploadUsers')
    .addSeparator()
    .addSubMenu(
      ui.createMenu('Tools')
        .addItem('Generate Google Files List', 'importGoogleFileInfo')
        .addItem('Generate Inferno AR Group List', 'importGroups')
        .addItem('Archive Users', 'archiveUsers')
    )
    .addToUi();
}

/**
 import or update users in InfernoAR Virtual Event PLatform
 **/
function uploadUsers(){
  const sheetName = 'users';
  const sheet = activeSheet.getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getActiveSpreadsheet().toast('worksheet "' + sheetName + '" does not exist', 'Status');
    return;
  }
  SpreadsheetApp.setActiveSheet(sheet);

  console.log('STARTING UPLOAD USERS *****************');
  SpreadsheetApp.getActiveSpreadsheet().toast('STARTING USER UPLOAD/UPDATE', 'Status');

  const config = new Config(spreadsheetId).values;
  const util = new NovoUtils(config);
  const newUsers = util.newUsers;

  const iar = new InfernoAR(config);

  newUsers.forEach( (newUser) => {addUser(newUser, iar) } );
  SpreadsheetApp.getActiveSpreadsheet().toast('COMPLETED USER UPLOAD/UPDATE', 'Status');
  console.log('FINSHED UPLOAD USERS *****************');
}

function addUser(newUser, iar) {
  const user = iar.addUser(newUser);
  console.log('added/updated user', user);

  const groups = iar.updateUserGroups(user, newUser.groupName);
  console.log('added/updated groups', groups);

  const profile = iar.addProfile(user.id, newUser);
  console.log('added/update profile', profile);

  if (profile.userId) {
    const image = iar.addProfileImage(user.id, newUser);
    console.log('updated image', image);
  }

}

function importGoogleFileInfo() {
  const sheetName = 'Google Files';

  SpreadsheetApp.getActiveSpreadsheet().toast('STARTING generation of Google Files List', 'Status');

  const config = new Config(spreadsheetId).values;
  const util = new NovoUtils(config);
  let sheet = activeSheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = activeSheet.insertSheet(sheetName);
  }
  SpreadsheetApp.setActiveSheet(sheet);
  util.listFolderContents(sheet);
  SpreadsheetApp.getActiveSpreadsheet().toast('COMPLETED generation of Google Files List', 'Status');
}

function importGroups() {
  const sheetName = 'InfernoAR Groups';

  SpreadsheetApp.getActiveSpreadsheet().toast('STARTING generation of Inferno AR Groups List', 'Status');
  let sheet = activeSheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = activeSheet.insertSheet(sheetName);
  }
  SpreadsheetApp.setActiveSheet(sheet);
  const config = new Config(spreadsheetId).values;
  const iar = new InfernoAR(config);
  const util = new NovoUtils(config);
  const groups = iar.fetchGroups();
  util.listGroups(sheet, groups);
  SpreadsheetApp.getActiveSpreadsheet().toast('COMPLETED generation of Inferno AR Groups List', 'Status');
}

function archiveUsers() {
  const sheetName = 'archiveUsers';

  SpreadsheetApp.getActiveSpreadsheet().toast('STARTING Adding users to Inferno AR ARCHIVE Group', 'Status');
  const sheet = activeSheet.getSheetByName(sheetName);
  if (!sheet) {
    SpreadsheetApp.getActiveSpreadsheet().toast('worksheet "' + sheetName + '" does not exist', 'Status');
    return;
  }
  SpreadsheetApp.setActiveSheet(sheet);

  const config = new Config(spreadsheetId).values;
  const iar = new InfernoAR(config);
  const util = new NovoUtils(config);
  const archive = util.fetchArchiveUsers();

  archive.forEach(user => iar.replaceUserGroup(user, 'ARCHIVE'));
  SpreadsheetApp.getActiveSpreadsheet().toast('COMPELTED Adding users to Inferno AR ARCHIVE Group', 'Status');
}
