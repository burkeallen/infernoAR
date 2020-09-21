class NovoUtils {
  constructor(config) {
    this.config = config;
    this.newUsers = this.fetchNewUsers();
  }


  /**
   **  be sure to update the range if you add columns of data to your import sheet
   **/
  fetchNewUsers() {
    const data = Sheets.Spreadsheets.Values.get(this.config.sheetId, 'users!A:J').values;
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
    const folderIds = this.config.imageFolderIds.split(',');

    folderIds.forEach((id) => {
      const folder = DriveApp.getFolderById(id);
      console.log('listing files in ', folder.getName());
      const files = folder.getFiles();
      while(files.hasNext()) {
        const file = files.next();
        sheet.appendRow( [file.getName(), file.getId()] );
      }
    });

  }

}
