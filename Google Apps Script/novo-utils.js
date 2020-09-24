class NovoUtils {
  constructor(config) {
    this.config = config;
    this.newUsers = this.fetchNewUsers();
  }


  /**
   **  be sure to update the range if you add columns of data to your import sheet
   **/
  fetchNewUsers() {
    const userSheet = activeSheet.getSheetByName('users');
    if(!userSheet) {
      SpreadsheetApp.getActiveSpreadsheet().toast('worksheet "users" does not exist', 'Status');
      return {};
    }

    const data = Sheets.Spreadsheets.Values.get(this.config.sheetId, 'users!A:J').values;
    //remove the header
    data.shift();
    //map array to object
    return data.map((row) => {
      return this.mapUser(row);
    });
  }

  /**
   **  be sure to update the range if you add columns of data to your import sheet
   **/
  fetchArchiveUsers() {
    const userSheet = activeSheet.getSheetByName('archiveUsers');
    if(!userSheet) {
      SpreadsheetApp.getActiveSpreadsheet().toast('worksheet "archiveUsers" does not exist', 'Status');
      return {};
    }

    const data = Sheets.Spreadsheets.Values.get(this.config.sheetId, 'archiveUsers!A:J').values;
    //remove the header
    data.shift();
    //map array to object
    return data.map((row) => {
      return this.mapUser(row);
    });
  }

  /**
   **  be sure to update mapping if you add or remove items, or move items(columns) around in the sheet
   **/
  mapUser(row) {
    //Group, Email, First Name, Last Name, University/Business, Position, Bio, Website, LinkedIn, Image
    return {
      groupName: row[0],
      email: row[1],
      firstName: row[2],
      lastName: row[3],
      org: row[4],
      position: row[5],
      bio: row[6],
      website: row[7],
      linkedIn: row[8],
      image: row[9]
    }
  }

  listFolderContents(sheet) {
    sheet.clear();
    sheet.appendRow( ['File Name', 'Google Id', 'Size', 'Type', 'Google Link'] );
    const folderIds = this.config.imageFolderIds.split(',');

    folderIds.forEach((id) => {
      const folder = DriveApp.getFolderById(id);
      console.log('listing files in ', folder.getName());
      const files = folder.getFiles();
      while(files.hasNext()) {
        const file = files.next();
        sheet.appendRow( [file.getName(), file.getId(), this.readableBytes(file.getSize()), file.getMimeType(), file.getUrl()] );
      }
    });

  }

  readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }

  listGroups(sheet, groups) {
    sheet.clear();
    sheet.appendRow( ['Group Name', 'id'] );
    groups.forEach((group) => {sheet.appendRow( [group.name, group.id] ) });

  }

}
