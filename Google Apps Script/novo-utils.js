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
   **  be sure to update the range if you add columns of data to your import sheet
   **/
  fetchArchiveUsers() {
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
      image: row[1],
      email: row[2],
      firstName: row[3],
      lastName: row[4],
      bio: row[5],
      facebook: row[6],
      twitter: row[7],
      youtube: row[8],
      linkedIn: row[9],
      instagram: row[10],
      phone: row[11],
      company: row[12],
      title: row[13],
      contactEmail: row[14],
      calendar: row[15],
      hideProfile: row[16]
    }
  }

  listFolderContents(sheet) {
    sheet.clear();
    sheet.appendRow( ['File Name', 'Google Id', 'Size', 'Type', 'Google Link'] );
    const folderIds = this.config.googleFileFolders.split(',');

    folderIds.forEach((folderLink) => {
      const folder = DriveApp.getFolderById(this.gDriveFolderId(folderLink));
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

  gDriveFolderId(folderLink) {
    const parts = folderLink.split('/');
    return parts[5];
  }

}
