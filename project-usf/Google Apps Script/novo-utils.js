class NovoUtils {
  constructor(config) {
    this.config = config;
    this.newUsers = this.fetchNewUsers();
  }


  fetchNewUsers() {
    const newUsers = Sheets.Spreadsheets.Values.get(this.config.sheetId, 'users!A:G').values;
    //remove the header
    newUsers.shift();

    return newUsers.map((rowData) => {
      this.mapUser(rowData)
    });
  }

  mapUser(rowData) {
    // group	first name	last name	org name	description	bio	email address
    return {
      groupName: rowData[0],
      firstName: rowData[1],
      lastName: rowData[2],
      org: rowData[3],
      desc: rowData[4],
      bio: rowData[5],
      email: rowData[6]
    }
  }


}
